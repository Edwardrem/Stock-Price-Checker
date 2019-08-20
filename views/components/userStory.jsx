import React from 'react';
import AppTitle from './common/appTitle.jsx';

const UserStory = () => {
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Personal Library</h1>} />
      <div className="user-story" >
        <h2>User Story</h2>
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
      </div>      
      
    </div>
  );
}

export default UserStory;