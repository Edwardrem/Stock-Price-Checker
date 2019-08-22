const React = require('react');
const queryString = require('query-string');

const {useState} = React;

const App = ({setResult}) => {
  
  
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
      setResult(data)
      console.log(data, JSON.stringify(data))
    })
    .catch(error => console.error('Error:', error));
  }
  
  return (
   <React.Fragment>
      
      <div className="submit-book">
        <h3>Get single price and total likes</h3>

        <div className="form-container">

            <form className="submit-price-form" onSubmit={handleSubmit}>

              <input className="form-stock1" type="text" name="stock" placeholder="goog"  required/>
              <label>
                Like?
                <input className="form-like" name="like" type="checkbox" value={true} />
              </label>
              <input className="form-submit" type="submit" value="Get Price!"/>

            </form>

        </div>

      </div>
      
      <div className="submit-book">
      <h3>Compare and get relative likes</h3>
      
      <div className="form-container">
        
          <form className="submit-compare-form" onSubmit={handleSubmit}>
            
            <input className="form-stock1" type="text" name="stock" placeholder="goog"  required/>
            <input className="form-stock2" type="text" name="stock" placeholder="msft"  required/>
            <label>
              Like?
              <input className="form-like" name="like" type="checkbox" value={true} />
            </label>
            <input className="form-submit" type="submit" value="Get Price!"/>
            
          </form>
        
      </div>
      
    </div>
      
   </React.Fragment>
  )
}

module.exports = App;