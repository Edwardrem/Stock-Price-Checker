import React, {useState} from 'react';

import StockChecker from './stockChecker.jsx';
import AppTitle from './common/appTitle.jsx';
import Output from './output.jsx';

const Home = () => {
  
  const [result, setResult] = useState('');
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Stock Price Checker</h1>} />
      <StockChecker setResult={setResult} />
      <Output result={result} />
      
    </div>
  );
  
}

export default Home;