const React = require('react');
const {useState} = React;

const App = () => {
  
  const [input, setInput] = useState('');
  const [jsonResult, setJsonResult] = useState('');
  
  const url = '/api/issues/apitest';
  
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    var object = {};
    data.forEach((value, key) => {object[key] = value});
    
    console.log(e.target, data, object, JSON.stringify(data))
    for(let d of data) {console.log(d)}
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(object), // data can be `string` or {object}!
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.json())
    .then((data) => {
      setJsonResult(JSON.stringify(data))
      console.log(data, JSON.stringify(data))
    })
    .catch(error => console.error('Error:', error));
  }
  
  return (
    <main className='container'>
      <div id="userstories">
        <h2>User stories:</h2>
        <ol>
          <li>Nothing from my website will be cached in my client as a security measure.</li>
          <li>I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.</li>
          <li>I can <b>post</b> a <code>title</code> to /api/books to add a book and returned will be the object with the <code>title</code> and a unique <code>_id</code>.</li>
          <li>I can <b>get</b> /api/books to retrieve an aray of all books containing <code>title</code>, <code>_id</code>, & <code>commentcount</code>.</li>
          <li>I can <b>get</b> /api/books/{'{'}_id{'}'} to retrieve a single object of a book containing <code>title</code>, <code>_id</code>, & an array of <code>comments</code> (empty array if no comments present).</li>
          <li>I can <b>post</b> a <code>comment</code> to /api/books/{'{'}_id{'}'} to add a comment to a book and returned will be the books object similar to <b>get</b> /api/books/{'{'}_id{'}'}.</li>
          <li>I can <b>delete</b> /api/books/{'{'}_id{'}'} to delete a book from the collection. Returned will be 'delete successful' if successful.</li>
          <li>If I try to request a book that doesn't exist I will get a 'no book exists' message.</li>
          <li>I can send a <b>delete</b> request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.</li>
          <li>All 6 functional tests required are complete and passing.</li>
        </ol>
        <br/>
        <img src='https://cdn.gomix.com/d7932c52-287f-4dae-b175-631fef453000%2FScreen%20Shot%202016-12-16%20at%201.35.56%20AM.png' />
      </div>
      
      <hr />
      <div id ='sampleposting'>
        <h2 >Test API responses:</h2>
        <form action="/api/books" method="post" class="border">
          <h4>Test post to /api/books</h4>
          Book Title:<br/>
          <input type="text" name="title" value=""/><br/>
          <input type="submit" value="Submit"/>
        </form>
        <form action="" method="post" id="commentTest" class="border">
          <h4>Test post to /api/books/{'{'}bookid{'}'}</h4>
          BookId to comment on:<br/>
          <input type="text" name="id" value="" id="idinputtest"/><br/>
          Comment:<br/>
          <input type="text" name="comment" value=""/><br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      <hr />
      <div id='sampleui'>
        <h2>Sample Front-End:</h2>
        <form id="newBookForm" class="border">
          <input type="text" id="bookTitleToAdd" name="title" placeholder="New Book Title" />
          <button type="submit" value="Submit" id="newBook">Submit New Book!</button>
        </form>
        <div id='display'></div>          
        <div id='bookDetail' class='border'>
          <p id='detailTitle'>Select a book to see it's details and comments</p>
          <ol id='detailComments'></ol>
        </div>
        <button id='deleteAllBooks'>Delete all books...</button>
      </div>
      <hr />
    </main>
  )
}

module.exports = App;