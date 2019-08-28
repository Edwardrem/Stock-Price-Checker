const React = require('react');
const queryString = require('query-string');

const {useState} = React;

const App = ({setResult}) => {
  
  
  const url = '/api/stock-prices?';
  
  const handleSubmit = e => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    const btn = e.target.lastChild;
    btn.disabled = true;
    
    const obj = {};
    data.forEach((value, key) => {
      if(obj[key]) obj[key] = [].concat(obj[key], value)
      else obj[key] = value
    });
    
    const q = queryString.stringify(obj);
    
    fetch(url + q)
    .then(res => res.json())
    .then((data) => {
      setResult(data)
      btn.disabled = false;
      document.getElementById('output').scrollIntoView();
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
              
              <label className="form-like-label" htmlFor="like1" >Like?</label>
              <input
                className="form-like-input"
                type="checkbox"
                id="like1" 
                name="like"
                value={true}
              />

              
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
            <label className="form-like-label" htmlFor="like2" >Like?</label>
            <input
              className="form-like-input"
              type="checkbox"
              id="like2" 
              name="like"
              value={true}
            />
            <input className="form-submit" type="submit" value="Get Price!"/>
            
          </form>
        
      </div>
      
    </div>
      
   </React.Fragment>
  )
}

module.exports = App;