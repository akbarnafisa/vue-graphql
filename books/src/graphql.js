import gql from 'graphql-tag';

export const BOOKS_QUERY = gql`
  {
    books{
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation($name:String!, $genre:String!, $authorId:ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`;

export const AUTHORS_QUERY = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const BOOK_QUERY = gql`
  query($id:ID){
    book(id:$id) {
      id
      name
      genre
      author{
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
