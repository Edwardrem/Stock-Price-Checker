const React = require('react');
const {useState} = React;

const App = () => {
  
  const [input, setInput] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/convert/'+ input)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
  }
  
  return (
    <div className='container'>
      <h3>User Stories</h3>
      <ol>
        <li>I will help prevent the client from trying to guess(sniff) the MIME type.</li>
        <li>I will prevent cross-site scripting (XSS) attacks.</li>
        <li>I can <b>GET</b> <code>/api/convert</code> with a single parameter containing an accepted number and unit and have it converted.</li>
        <li>Hint: Split the input by looking for the index of the first character.</li>
        <li>I can convert 'gal' to 'L' and vice versa. <b>(1 gal to 3.78541 L)</b></li>
        <li>I can convert 'lbs' to 'kg' and vice versa. <b>(1 lbs to 0.453592 kg)</b></li> 
        <li>I can convert 'mi' to 'km' and vice versa. <b>(1 mi to 1.60934 km)</b></li>
        <li>If my unit of measurement is invalid, returned will be 'invalid unit'.</li>
        <li>If my number is invalid, returned with will 'invalid number'.</li>
        <li>If both are invalid, return will be 'invalid number and unit'.</li>
        <li>I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.</li>
        <li>My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format <code>{'{'}initNum{'}'} {'{'}initial_Units{'}'} converts to {'{'}returnNum{'}'} {'{'}return_Units{'}'}</code> with the result rounded to 5 decimals.</li>
        <li>All 16 unit tests are complete and passing.</li>
        <li>All 5 functional tests are complete and passing.</li>
      </ol>
      <h3>Example usage:</h3>
      <code>/api/convert?input=4gal</code><br/>
      <code>/api/convert?input=1/2km</code><br/>
      <code>/api/convert?input=5.4/3lbs</code><br/>
      <code>/api/convert?input=kg</code><br/>
      <h3>Example return:</h3>
      <code>{'{'}initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'{'}'}</code>
      <hr/>
      <div id='testui'>
        <h2 >Front-End:</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="input" placeholder="3.1mi" onChange={e => setInput(e.terget.value)}/>
          <input type="submit" value='Convert!'/>
        </form>
        <p id='result'></p>
        <code id='jsonResult'></code>
      </div>
      <hr/>
    </div>
  )
}

module.exports = App;