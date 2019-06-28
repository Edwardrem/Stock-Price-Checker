const React = require('react');
const {useState} = React;

const App = () => {
  
  const [input, setInput] = useState('');
  const [resultText, setResultText] = useState('');
  const [resultJson, setResultJson] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/convert?input='+ input)
      .then(response => response.json())
      .then((data) => {
        setResultText(data.string)
        setResultJson(JSON.stringify(data))
      });
  }
  
  return (
    <main className='container'>
      <div id='userstories'>
        <h3>User Stories</h3>
        <ol>
          <li>Prevent cross site scripting(XSS attack).</li>
          <li>I can <b>POST</b> <code>/api/issues/{'{'}projectname{'}'}</code> with form data containing required <i>issue_title</i>, <i>issue_text</i>, <i>created_by</i>, and optional <i>assigned_to</i> and <i>status_text</i>.</li>
          <li>The object saved (and returned) will include all of those fields (blank for optional no input) and also include <i>created_on</i>(date/time), <i>updated_on</i>(date/time), <i>open</i>(boolean, true for open, false for closed), and <i>_id</i>.</li>
          <li>I can <b>PUT</b> <code>/api/issues/{'{'}projectname{'}'}</code> with a <i>_id</i> and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update <i>updated_on</i>. If no fields are sent return 'no updated field sent'.</li>
          <li>I can <b>DELETE</b> <code>/api/issues/{'{'}projectname{'}'}</code> with a <i>_id</i> to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.</li>
          <li>I can <b>GET</b> <code>/api/issues/{'{'}projectname{'}'}</code> for an array of all issues on that specific project with all the information for each issue as was returned when posted.</li>
          <li>I can filter my get request by also passing along any field and value in the query(ie. <code>/api/issues/{'{'}project{'}'}?open=false</code>). I can pass along as many fields/values as I want.</li>
          <li>All 11 functional tests are complete and passing.</li>
        </ol>
        <br/>
        <h3>Example get usage:</h3>
        <code>/api/issues/{'{'}project{'}'}</code><br/>
        <code>/api/issues/{'{'}project{'}'}?open=true&amp;assigned_to=Joe</code><br/>
        <h3>Example return:</h3>
        <code>[{'{'}"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"{'}'},...]</code>
        <br/><br/>
        <h2><a href='/apitest/'>EXAMPLE: Go to <i>/apitest/</i> project issues</a></h2>
      </div>
      <hr/ >
      
    </main>
  )
}

module.exports = App;