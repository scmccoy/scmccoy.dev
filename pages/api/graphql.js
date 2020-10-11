import { ApolloServer, gql } from 'apollo-server-micro';
import connectDb from '../../lib/mongoose';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
// Habits GraphQL
import { habitsResolvers } from '../../src/api/habits/resolvers';
import { habitsMutations } from '../../src/api/habits/mutations';
import Habits from '../../src/api/habits/Habits.graphql';
// Retro GraphQL
import { retroResolvers } from '../../src/api/retro/resolvers';
import { retroMutations } from '../../src/api/retro/mutations';
import Cards from '../../src/api/retro/Retro.graphql';

// TYPES
const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;
const typeDefs = mergeTypeDefs([Cards]);

// RESOLVERS
const fakeResolvers = {
  Query: {
    sayHello: () => {
      return 'Shane';
    },
  },
};
// combine all resolvers
const resolvers = mergeResolvers([retroResolvers, retroMutations]);

// SERVER
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// route config
export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({ path: '/api/graphql' });

export default connectDb(server);
