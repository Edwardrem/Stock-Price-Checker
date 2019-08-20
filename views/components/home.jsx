import React, {useState} from 'react';

import SubmitBook from './submitBook.jsx';
import DeleteAllBooks from './deleteAllBooks.jsx';
import Books from './books.jsx';
import AppTitle from './common/appTitle.jsx';

const Home = () => {
  
  const [books, setBooks] = useState([]);
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Personal Library</h1>} />
      <SubmitBook books={books} setBooks={setBooks}/>
      <DeleteAllBooks setBooks={setBooks}/>
      <Books books={books} setBooks={setBooks}/>
      
    </div>
  );
  
}

export default Home;