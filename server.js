const { ApolloServer } = require('apollo-server');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const neo4j = require('neo4j-driver');

const { typeDefs, resolvers } = require('./src/resolver')

const schema = makeAugmentedSchema({ typeDefs });


const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'kranti')
);

const server = new ApolloServer({ schema, context: { driver } });

server.listen().then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });