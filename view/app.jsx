const React = require('react');
const {useState} = React;

const App = () => {
  
  const [date, setDate] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = "https://fcc-bt-timestamp-microservice.glitch.me/api/timestamp/api/shorturl/" + date;
  }
  
  return (
    <div class="container">
       <h1>Exercise tracker</h1>
        <form action="/api/exercise/new-user" method="post">
          <h3>Create a New User</h3>
          <p><code>POST /api/exercise/new-user</code></p>
          <input id="uname" type="text" name="username" placeholder="username"/>
          <input type="submit" value="Submit"/>
        </form><br/>
        <form action="/api/exercise/add" method="post">
          <h3>Add exercises</h3>
          <p><code>POST /api/exercise/add</code></p>
          <input id="uid" type="text" name="userId" placeholder="userId*"/>
          <input id="desc" type="text" name="description" placeholder="description*"/>
          <input id="dur" type="text" name="duration" placeholder="duration* (mins.)"/>
          <input id="dat" type="text" name="date" placeholder="date (yyyy-mm-dd)"/>
          <input type="submit" value="Submit"/>
        </form>
        <p><strong>GET users's exercise log: </strong><code>GET /api/exercise/log?{'{'}userId{'}'}[&amp;from][&amp;to][&amp;limit]</code></p>
        <p><strong>{'{ }'}</strong> = required, <strong>[ ]</strong> = optional</p>
        <p><strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong> = number</p>
      
        <h3>User Stories :</h3>
        <ol className="user-stories">
          
          <li>I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.</li>
          <li>I can get an array of all users by getting api/exercise/users with the same info as when creating a user.</li>
          <li>I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.</li>
          <li>I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).</li>
          <li>I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)</li>
        </ol>
    </div>
  )
}

module.exports = App;