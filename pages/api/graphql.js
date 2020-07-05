import { ApolloServer, gql } from "apollo-server-micro";
import connectDb from '../../lib/mongoose';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
// Habits GraphQL
import { habitsResolvers } from '../../src/api/habits/resolvers';
import { habitsMutations } from '../../src/api/habits/mutations';
import Habits from '../../src/api/habits/Habits.graphql';

// TYPES
const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;
const typeDefs = mergeTypeDefs([fakeTypeDefs, Habits])

// RESOLVERS
const fakeResolvers = {
  Query: {
    sayHello: () => {
      return "Shane";
    },
  },
};
// combine all resolvers
const resolvers = mergeResolvers([habitsResolvers, habitsMutations])

// SERVER
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// route config
export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });

export default connectDb(server);
