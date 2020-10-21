import { ApolloServer, gql } from 'apollo-server-micro';
import connectDb from '../../lib/mongoose';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
// Retro GraphQL
import { retroResolvers } from '../../src/api/retro/resolvers';
import { retroMutations } from '../../src/api/retro/mutations';
import Cards from '../../src/api/retro/Retro.graphql';

// TYPES
const typeDefs = mergeTypeDefs([Cards]);

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
