import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    vendors: [Vendor]
    vendor(path: ID!): Vendor
    files: [File]
  }
  type Vendor {
    source: String!
    subsource: String
    year: String
    month: String
    day: String
    path: String
    vendor_custom: [Vendor]
    get_files: [File]
  }
  type File {
    name: String!
    version: String!
    created_on: String!
    path: String!
  }
`;