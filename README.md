# SpakGql

Just install pacakes and you are good to go
Install
>npm install

Run
>npm start


https://spakgql.herokuapp.com/graphql

sample query

    {
      Country(name: "BA") {
        name
        native
        phone
        continent
        capital
        currency
        languages {
          code
          name
        }
      }
    }
