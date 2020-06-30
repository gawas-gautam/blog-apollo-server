import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Movie {
  movieId: ID!
  title: String
  released: Int
  tagline: String
  poster: String
  imdbRating: Float
  similar(first: Int = 3, offset: Int = 0): [Movie] @cypher(statement: "MATCH (this)-[:IN_GENRE]->(:Genre)<-[:IN_GENRE]-(o:Movie) RETURN o")
  degree: Int @cypher(statement: "RETURN SIZE((this)-->())")
  actors(first: Int = 3, offset: Int = 0): [Actor] @relation(name: "ACTED_IN", direction:"IN")
}

type Actor {
  id: ID!
  name: String
  movies: [Movie]
}

type Post {
  id: ID!
  name: String

}

type Query {
  Movie(id: ID, title: String, released: Int, tagline: String, imdbRating: Float, first: Int, offset: Int): [Movie]
  Actors: [Actor]
}
`;

export const resolvers = {
  // entry point to GraphQL service
  Query: {
    Movie: async(object, params, ctx, resolveInfo) =>{
      return await neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};