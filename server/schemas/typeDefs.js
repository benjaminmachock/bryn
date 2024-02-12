const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks:[Book]
  },
  type Auth {
    token: ID!
    user: User
  },
  input InputBook {
    description: String
    title: String
    bookId: String
    authors:[String]
    image: String
  },

  type Book {
    description: String
    title: String
    bookId: String
    authors:[String]
    image: String
  },
  

  type Query {
    me(userId: ID!): User
  },
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: InputBook!, id: String!): User
    removeBook(bookId: String, userId: String!): User
  }

  
`;

module.exports = typeDefs;