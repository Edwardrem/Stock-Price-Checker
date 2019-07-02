const React = require('react');
const queryString = require('query-string');

const {useState} = React;

const App = () => {
  
  const [input, setInput] = useState('');
  const [bookId, setBookId] = useState('');
  const [jsonResult, setJsonResult] = useState('');
  
  const url = '/api/stock-prices?';
  
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    var obj = {};
    data.forEach((value, key) => {
      if(obj[key]) obj[key] = [].concat(obj[key], value)
      else obj[key] = value
    });
    
    const q = queryString.stringify(obj);
    
    fetch(url + q)
    .then(res => res.json())
    .then((data) => {
      setJsonResult(JSON.stringify(data))
      console.log(data, JSON.stringify(data))
    })
    .catch(error => console.error('Error:', error));
  }
  
  return (
    <main className='container'>
      <div id='userstories'>
        <h3>User Stories</h3>
        <ol>
          <li>Set the content security policies to only allow loading of scripts and css from your server.</li>
          <li>I can <b>GET</b> <code>/api/stock-prices</code> with form data containing a Nasdaq <i>stock</i> ticker and recieve back an object <i>stockData</i>.</li>
          <li>In <i>stockData</i>, I can see the <i>stock</i>(string, the ticker), <i>price</i>(decimal in string format), and <i>likes</i>(int).</li>
          <li>I can also pass along field <i>like</i> as <b>true</b>(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.</li>
          <li>If I pass along 2 stocks, the return object will be an array with both stock's info but instead of <i>likes</i>, it will display <i>rel_likes</i>(the difference between the likes on both) on both.</li>
          <li>A good way to receive current price is the following external API(replacing 'GOOG' with your stock): <code>https://finance.google.com/finance/info?q=NASDAQ%3aGOOG</code></li>
          <li>All 5 functional tests are complete and passing.</li>
        </ol>
        <h3>Example usage:</h3>
        <code>/api/stock-prices?stock=goog</code><br/>
        <code>/api/stock-prices?stock=goog&amp;like=true</code><br/>
        <code>/api/stock-prices?stock=goog&amp;stock=msft</code><br/>
        <code>/api/stock-prices?stock=goog&amp;stock=msft&amp;like=true</code><br/>
        <h3>Example return:</h3>
        <code>{'{'}"stockData":{'{'}"stock":"GOOG","price":"786.90","likes":1{'}}'}</code><br/>
        <code>{'{'}"stockData":[{'{'}"stock":"MSFT","price":"62.30","rel_likes":-1{'}'},{'{'}"stock":"GOOG","price":"786.90","rel_likes":1{'}]}'}</code>
      </div>
      
      <hr />
    <div id='testui'>
      <h2 >Front-End:</h2>
      <h3>Get single price and total likes</h3>
      <form id="testForm2" class="border" onSubmit={handleSubmit}>
        <input type="text" name="stock" placeholder="goog"  required/>
        <input type="checkbox" name="like" value={true}/> Like?<br/>
        <input type="submit" value="Get Price!"/>
      </form>
      <h3>Compare and get relative likes</h3>
      <form id="testForm" class="border" onSubmit={handleSubmit}>
        <input type="text" name="stock" placeholder="goog"  required/>
        <input type="text" name="stock" placeholder="msft"  required/>
        <input type="checkbox" name="like" value={true}/> Like both?<br/>
        <input type="submit" value="Get Price!"/>
      </form>
      <code id='jsonResult'></code>
    </div>
    <hr />
    </main>
  )
}

module.exports = App;