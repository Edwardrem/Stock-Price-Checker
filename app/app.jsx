const React = require('react');
const {useState} = React;

const App = () => {
  
  const [date, setDate] = useState('');
  
  const handleSubmit = () => {
    window.location.href = "https://fcc-bt-timestamp-microservice.glitch.me/api/timestamp/" + date;
  }
  
  return (
    <main>
    <div className="container">
        <h2>API Project: Timestamp Microservice</h2>
        <a href="https://fcc-bt-timestamp-microservice.glitch.me/api/timestamp/">Get timestamp for today</a><br/>
        
        <form onSubmit={handleSubmit}>
          Get timestamp:<br/>
          <input type="text" placeholder="2016-11-20" name="date" onChange={e => setDate(e.target.value)}  />
          <input type="submit" value="Submit"/>
        </form>
        
        
        <h3>User Stories :</h3>
        <ol className="user-stories">
          
          <li>The API endpoint is <code>GET [project_url]/api/timestamp/:date_string?</code></li>
          <li>A date string is valid if can be successfully parsed by <code>new Date(date_string)</code>.<br/>
          Note that the unix timestamp needs to be an <strong>integer</strong> (not a string) specifying <strong>milliseconds</strong>.<br/> 
          In our test we will use date strings compliant with ISO-8601 (e.g. <code>"2016-11-20"</code>) because this will ensure an UTC timestamp.</li>
          <li>If the date string is <strong>empty</strong> it should be equivalent to trigger <code>new Date()</code>, i.e. the service uses the current timestamp.</li>
          <li>If the date string is <strong>valid</strong> the api returns a JSON having the structure<br/><code>{'{'}"unix": &lt;date.getTime()&gt;, "utc" : &lt;date.toUTCString()&gt; {'}'}</code><br/>
            e.g. <code>{'{'}"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"{'}'}</code></li>
          <li>If the date string is <strong>invalid</strong> the api returns a JSON having the structure <br/>
              <code>{'{'}"unix": null, "utc" : "Invalid Date" {'}'}</code>. It is what you get from the date manipulation functions used above.
          </li>
        </ol>

        <h3>Example Usage:</h3>
        <ul>
          <li>
            <code>GET [project url]/api/timestamp/2015-12-25</code></li>
          <li><code>GET project url]/api/timestamp/1450137600</code></li>
        </ul>

        <h3>Example Output:</h3>
        <p>
          <code>{'{'}"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"{'}'}</code>
        </p>
      </div>
    </main>
  )
}

module.exports = App;