/*
*
    Define shared base types for all separate schmas:
*/
import { gql } from 'apollo-server-express';
import navSchema from './nav.js';
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
export default [linkSchema, navSchema];