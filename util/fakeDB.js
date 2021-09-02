const fs = require('fs')
const csv = require('csv-parser')
var path = require('path');
var root = path.dirname(require.main.filename);
var finalData;
let readFile = (fileName)=> {   
    var data = [];
    return new Promise((resolve)=>{
        fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', function (row) {
            data.push(row);
        })
        .on('end', function () {
            // console.table(data)
            resolve(data);
        })
    })
    
}

let createFakeDB = ()=>{
    return new Promise(async resolve=>{
        
        let continents = await readFile(root + '/../fakeDB/continents.csv')
    
        let countries = await readFile(root + '/../fakeDB/countries.csv')
        
        let languages = await readFile(root + '/../fakeDB/languages.csv')
        finalData = {continents,countries,languages};
        return resolve("OK");    
    })

}

let getDataFromDB  = ()=>{
    // console.log(data);
    if(finalData !== undefined)
        return finalData;
    else
        createFakeDB().then(()=>{
            return finalData;
        });    
}


module.exports = {getDataFromDB,createFakeDB};