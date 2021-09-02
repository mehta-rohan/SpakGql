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
    
    
 response   
{
  "data": {
    "Country": {
      "name": "Bosnia and Herzegovina",
      "native": "Bosna i Hercegovina",
      "phone": "387",
      "continent": "Europe",
      "capital": "Sarajevo",
      "currency": "BAM",
      "languages": [
        {
          "code": "bs",
          "name": "Bosnian"
        },
        {
          "code": "hr",
          "name": "Croatian"
        },
        {
          "code": "sr",
          "name": "Serbian"
        }
      ]
    }
  }
}
