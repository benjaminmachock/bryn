import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($book: InputBook!, $id: String!) {
  saveBook(book: $book, id: $id) {
    _id
    username
    savedBooks {
      description
      title
      bookId
      authors
      image
    }
    bookCount
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!, $userId:String!) {
  removeBook(bookId: $bookId, userId:$userId) {
    _id
    username
    savedBooks {
      description
      title
      bookId
      authors
      image
    }
    bookCount
  }
}
`;

