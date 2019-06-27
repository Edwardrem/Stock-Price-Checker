const React = require('react');
const {useState} = React;

const App = () => {
  
  const [userId, setUserId] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = "https://fcc-bt-exercise-tracker.glitch.me/api/exercise/users";
  }
  
  return (
    <div className='container'>
      
    </div>
  )
}

module.exports = App;