import React from 'react';
import AppTitle from './common/appTitle.jsx';

const UserStory = () => {
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Personal Library</h1>} />
      <div className="user-story" >
        <h2>User Story</h2>
        <ol>
          
          <li>Set the content security policies to only allow loading of scripts and css from your server.</li>
          
          <li>I can <b>GET</b> <code>/api/stock-prices</code> with form data containing a Nasdaq <i>stock</i> ticker and recieve back an object <i>stockData</i>.</li>
          
          <li>In <i>stockData</i>, I can see the <i>stock</i>(string, the ticker), <i>price</i>(decimal in string format), and <i>likes</i>(int).</li>
          
          <li>I can also pass along field <i>like</i> as <b>true</b>(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.</li>
         
          <li>If I pass along 2 stocks, the return object will be an array with both stock's info but instead of <i>likes</i>, it will display <i>rel_likes</i>(the difference between the likes on both) on both.</li>
          
          <li>A good way to receive current price is the following external API(replacing 'GOOG' with your stock): <code>https://finance.google.com/finance/info?q=NASDAQ%3aGOOG</code></li>
         
          <li>All 5 functional tests are complete and passing.</li>
          
        </ol>
      </div>      
      
    </div>
  );
}

export default UserStory;