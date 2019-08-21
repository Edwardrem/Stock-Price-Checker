import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import AppTitle from './common/appTitle.jsx';

const CodeSolution = () => {

  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Stock Price Checker</h1>} />
      <div className="code-solution">
        <h2>Code Solution</h2>
        <ol>
          
          <li>Set the content security policies to only allow loading of scripts and css from your server.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q1}
          </SyntaxHighlighter>
          
          <li>I can <b>GET</b> <code>/api/stock-prices</code> with form data containing a Nasdaq <i>stock</i> ticker and recieve back an object <i>stockData</i>.</li>
          
          <li>In <i>stockData</i>, I can see the <i>stock</i>(string, the ticker), <i>price</i>(decimal in string format), and <i>likes</i>(int).</li>
          
          <li>I can also pass along field <i>like</i> as <b>true</b>(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.</li>
         
          <li>If I pass along 2 stocks, the return object will be an array with both stock's info but instead of <i>likes</i>, it will display <i>rel_likes</i>(the difference between the likes on both) on both.</li>
          
          <li>A good way to receive current price is the following external API(replacing 'GOOG' with your stock): <code>https://finance.google.com/finance/info?q=NASDAQ%3aGOOG</code></li>
         
          <li>All 5 functional tests are complete and passing.</li>
          
        </ol>
      </div>   
      
    </div>
  );
}

  const q1 = `app.use(helmet.noCache());`
  
  const q2 = `app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));`
  
  const q3 = `app.route('/api/books')
    .post(async (req, res, next) => {
      try{
        const {title} = req.body;
        if(!title) return next(newError('missing title', 400));

        const { error } = validate({title});
        if (error) return next(newError(error.details[0].message, 400));

        const collection = await connect();

        const doc = {title:title, comments:[]};
        const book = await collection.insert(doc)

        if(!book) return next(newError('sorry could not add book. try again! thanks', 400))
        res.json({success: true, book: book.ops[0], message: 'Book successfully added'});
        
      } catch(err) {
        res.json(err)
      }
    })`
  
  const q4 = `app.route('/api/books')
    .get(async (req, res) => {
      try {
        const collection = await connect();
        let books = await collection.find().toArray()

        books = books.map(elm => {
          elm.commentcount = elm.comments.length
          delete elm.comments;
          return elm
        })
        res.json(books);
        
      } catch(err) {
        res.json(err)
      }
    })`
  
  const q5 = `app.route('/api/books/:id')
    .post(async (req, res, next) => {
      try {
        const {comment} = req.body;
        let {id} = req.params;

        if(!id || !comment) return next(newError('please enter an id and comment', 400));
        id = new ObjectId(id);

        const collection = await connect();
        const updatedBook = await collection.findAndModify(
          {_id: id},
          {},
          {$push: { comments: comment }},
          {new: true, upsert: false}
        )
        if(!updatedBook) return next(newError('sorry could not add comment. try again! thanks', 400))  
        res.json({success: true, book: updatedBook.value, message: 'Comment successfully added'});

      } catch(err) {
        res.json(err)
      }
    })`
  
  const q6 = `app.route('/api/books/:id')
    .delete(async (req, res, next) => {
      try {
        let {id} = req.params;

        if(!id) return next(newError('please enter an id', 400));
        id = new ObjectId(id); 

        const collection = await connect();
        const deletedBook = collection.findOneAndDelete({_id:id})

        if (!deletedBook) return next(newError('could not delete '+ id, 400));
        res.json({success: true, message: 'delete successful'})

      } catch(err) {
        res.json(err)
      }
    });`
  
  const q7 = `app.route('/api/books/:id')
    .get(async (req, res, next) => {
      try {
        let {id} = req.params;

        if(!id) return next(newError('please enter an id.', 400));
        id = new ObjectId(id); 

        const collection = await connect();
        const book = await collection.find({_id:id}).toArray()
        
        if(book.length === 0) return next(newError('no book exists', 400));
        res.json({success: true, book: book[0]});
        
      } catch(err) {
        res.json(err)
      }
    })`

  const q8 = `app.route('/api/books')
    .delete(async (req, res, next) => {
      try {
        const collection = await connect();
        const drop = await collection.drop();

        if (!drop) return next(newError('sorry could not delete all book. try again! thanks', 400));
        res.json({success: true, message: 'complete delete successful'});

      } catch(err) {
        res.json(err)
      }
    });`
  
  const q9_1 = `suite('Functional Tests', function() {

  suite('Routing tests', function() {

    let id;

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: 'test book'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.book.title, 'test book');
          
            assert.isArray(res.body.book.comments, 'Comments should be an array');
          
            assert.property(res.body.book, 'comments', 'should have property comments');
            assert.property(res.body.book, 'title', 'should have property title');
            assert.property(res.body.book, '_id', 'should have property _id');

            done();
          });     
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'missing title');
          
            done();
          });       
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
          
            assert.isArray(res.body, 'response should be an array');
          
            assert.property(res.body[0], 'commentcount', 'should have property commentcount');
            assert.property(res.body[0], 'title', 'should have property title');
            assert.property(res.body[0], '_id', 'should have property _id');
          
            id = res.body[0]._id;
          
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/012345678901234567891234')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'no book exists');
          
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/'+ id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.book._id, id);
          
            assert.isArray(res.body.book.comments, 'Comments should be an array');
          
            assert.property(res.body.book, 'comments', 'should have property comments');
            assert.property(res.body.book, 'title', 'should have property title');
            assert.property(res.body.book, '_id', 'should have property _id');
            
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/'+ id)
          .send({comment: 'test comment'})
          .end((err, res) => {
            assert.equal(res.status, 200);
          
            assert.isArray(res.body.book.comments, 'Comments should be an array');
          
            assert.include(res.body.book.comments, 'test comment', 'Comments should include test comment');
          
            assert.property(res.body.book, 'comments', 'should have property comments');
            assert.property(res.body.book, 'title', 'should have property title');
            assert.property(res.body.book, '_id', 'should have property _id');
          
            done();
          });     
      });
      
    });

  });

});
`
  
  const q9_2 = `  Functional Tests

    ✓ #example Test GET /api/books (948ms)

    Routing tests

      POST /api/books with title => create book object/expect book object

        ✓ Test POST /api/books with title (464ms)

        ✓ Test POST /api/books with no title given

      GET /api/books => array of books

        ✓ Test GET /api/books (722ms)

      GET /api/books/[id] => book object with [id]

        ✓ Test GET /api/books/[id] with id not in db (450ms)

        ✓ Test GET /api/books/[id] with valid id in db (542ms)

      POST /api/books/[id] => add comment/expect book object with id

        ✓ Test POST /api/books/[id] with comment (497ms)



  7 passing (4s)
`
  
export default CodeSolution;