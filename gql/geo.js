const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    buildSchema,
    GraphQLSchema,
    GraphQLList
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

var data = require('../util/fakeDB').getDataFromDB();


var schema, RootQuery;

// GraphQL schema
schema = buildSchema(`
        type Query {
            Country(code: String!): Detail
            Countries(code: String): [Detail]
        },
        type Detail {
            name : String
            native: String
            capital: String
            currency: String
            phone:String
            continent:String
            language: [Language]
        }
        type Language {
            code : String
            name : String
        }
    `);


const LanguageType = new GraphQLObjectType({
    name: "Languages",
    fields: () => ({
        code: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    })
})

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        native: {
            type: GraphQLString
        },
        capital: {
            type: GraphQLString
        },
        currency: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        continent: {
            type: GraphQLString
        },
        languages: {
            type: new GraphQLList(LanguageType)
        }


    })
});


let getResutlsFromDB = (args) => {

    let element;
    let countryData = data.countries.filter((country) => {
        return country['Code'] == args.name.toLocaleUpperCase();
    })
    if (countryData.length > 0) {
        for (let index = 0; index < countryData.length; index++) {
            element = countryData[index];
            // console.log("this ele", element);
            if (!Array.isArray(element.Languages)) {
                let languages = element.Languages ? element.Languages.split(",") : [""];
                var lans = [];
                for (let i = 0; i < languages.length; i++) {
                    for (let j = 0; j < data.languages.length; j++) {
                        // data.languages[j];
                        var details = data.languages[j];
                        // console.log(details['Code'],languages[i])
                        if (details['Code'] == languages[i]) {
                            console.log(details);
                            details.code = details.Code;
                            details.name = details.Name;
                            // delete details.Native;
                            // delete details.Rtf;
                            // delete details.Code;
                            // delete details.Name;

                            lans.push(details);
                        }

                    }

                }
                element['Languages'] = lans;
            }

        }
        let {
            Name: name,
            Native: native,
            Phone: phone,
            Continent: continent,
            Capital: capital,
            Currency: currency,
            Languages: languages
        } = element;
        return {
            name,
            native,
            phone,
            continent,
            capital,
            currency,
            languages
        }
    } else {
        return {};
    }
}
//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Country: {
            type: CountryType,
            //argument passed by the user while making the query
            args: {
                name: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user

                return getResutlsFromDB(args);


            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
});