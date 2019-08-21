import React, {useState} from 'react';


import AppTitle from './common/appTitle.jsx';

const Home = () => {
  
  const [books, setBooks] = useState([]);
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Personal Library</h1>} />
     
      
    </div>
  );
  
}

export default Home;