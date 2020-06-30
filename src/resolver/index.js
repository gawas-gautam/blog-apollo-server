const { neo4jgraphql } = require("neo4j-graphql-js");
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
    }

    type User {
      id: ID!
      name: String
      email: String
    }

    type Post {
      id: ID!
      user_id: Int
      title: String
      body: String
      image: String
    }

    type Muatation {
      CreatePost(id: ID!, title: String!, body: String!): Post
      UpdatePost(id: ID!, title: String, body: String): Post
      DeletePost(id: ID!): Post
      CreateUser(id: ID!, name: String, email: String): User
      DeleteUser(id: ID!): User
    }
`;

const resolvers = {
   Query: {
    post(parent, params, ctx, resolveInfo) {
      return neo4jgraphql(parent, params, ctx, resolveInfo);
    },
    posts(parent, params, ctx, resolveInfo) {
      return neo4jgraphql(parent, params, ctx, resolveInfo);
    }
   },

   Muatation: {
    CreatePost(parent, params, ctx, resolveInfo) {
      return neo4jgraphql(parent, params, ctx, resolveInfo);
    },
    UpdatePost(parent, params, ctx, resolveInfo) {
      return neo4jgraphql(parent, params, ctx, resolveInfo);
    },
    DeletePost(parent, params, ctx, resolveInfo) {
      return neo4jgraphql(parent, params, ctx, resolveInfo);
    }
   }
};

module.exports = {typeDefs, resolvers}