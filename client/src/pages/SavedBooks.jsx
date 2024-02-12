import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { GET_ME } from '../utils/queries'; //here
import { REMOVE_BOOK } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';


const SavedBooks = () => {
  // get token
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  let userId =''

  if(token){
    const user = Auth.getProfile()
    userId = user.data._id
  }

  const { loading, data } = useQuery(GET_ME, 
    {
      variables: { userId: userId },
    }
  );
  
  const userData = data

  // const newdata = {...userData?.me};
  const [removeBook] = useMutation( REMOVE_BOOK);
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  console.log(loading, data, userData)

  const handleDeleteBook = async (bookId) => {
    
    try {
      const {data} = await removeBook({
      variables: { bookId: bookId, userId: userId },
    });
    if (!data) {
      throw new Error("something went wrong!");
    }
     // update state of books:
    // setData(()=>{
    //   return{...userData, savedBooks: data.data.removeBook.savedBooks}
    // })
  } catch (err) {
    console.error(err);
  }
  removeBookId(bookId);
};

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.me.bookCount > 0
            ? `Viewing ${userData.me.bookCount} saved ${userData.me.bookCount === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData?.me.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
