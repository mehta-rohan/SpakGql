var express = require('express');
var router = express.Router();

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('../gql/geo')

/* GET home page. */
router.use('/graphql', graphqlHTTP({
  //directing express-graphql to use this schema to map out the graph 
  schema,
  //directing express-graphql to use graphiql when goto '/graphql' address in the browser
  //which provides an interface to make GraphQl queries
  graphiql: true
}));



module.exports = router;