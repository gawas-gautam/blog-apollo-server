const { importSchema } = require('graphql-import');
//import { makeExecutableSchema } from 'graphql-tools'
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const { ApolloServer } = require('apollo-server');
const path = require('path');
const { driver } = require('./connections/neo4j');

import { typeDefs, resolvers } from './resolver/movie';
//const typeDefs = importSchema('./schema.graphql')
//const resolvers = {}

//const typeDefs = importSchema(path.resolve(__dirname, 'schema.graphql'));


const schema = makeAugmentedSchema({ typeDefs, resolvers });


const server = new ApolloServer({ schema, context: { driver } });

//const server = new ApolloServer({ typeDefs, resolvers})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});