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
   <React.Fragment>
      
      <div className="submit-book">
        <h3>Get single price and total likes</h3>

        <div className="form-container">

            <form className="submit-book-form" onSubmit={handleSubmit}>

              <input className="form-title" type="text" name="stock" placeholder="goog"  required/>
              <input className="form-submit" type="submit" value="Add Book"/>

            </form>

        </div>

      </div>
      
      <div className="submit-book">
      <h3>Compare and get relative likes</h3>
      
      <div className="form-container">
        
          <form className="submit-book-form" onSubmit={handleSubmit}>
            
            <input className="form-title" type="text" name="title" placeholder="*Book Title" required/>
            <input className="form-submit" type="submit" value="Add Book"/>
            
          </form>
        
      </div>
      
    </div>
      
   </React.Fragment>
  )
}

module.exports = App;