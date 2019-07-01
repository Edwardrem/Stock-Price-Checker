/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const URL = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

function validate(req) {
  const schema = {
    title : Joi.string().min(3).max(50).required()
  };
  return Joi.validate(req, schema);
}

async function connect() {
  const db = await MongoClient.connect(URL)
  return db.collection('books');
}

module.exports = function (app) {

  app.route('/api/books')
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
    })
    
    .post(async (req, res) => {
      try{
        const title = req.body.title;
        if(!title) return res.send('missing title');

        const { error } = validate({title: title});
        if (error) return res.send(error.details[0].message);

        const collection = await connect();

        const doc = {title:title, comments:[]};
        const book = await collection.insert(doc)

        if(!book) return res.send('sorry could not add book. try again! thanks')
        res.json(book.ops[0]);
        
      } catch(err) {
        res.json(err)
      }
    })
    
    .delete(async (req, res) => {
      try {
        const collection = await connect();
        const drop = await collection.drop();

        if (!drop) return res.send('sorry could not delete all book. try again! thanks');
        res.send("complete delete successful");

      } catch(err) {
        res.json(err)
      }
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      try {
        let id = req.params.id;

        if(!id) return res.send('please enter an id.');
        id = new ObjectId(id); 

        const collection = await connect();
        const book = await collection.find({_id:id}).toArray()
        
        if(book.length === 0) return res.send('no book exists');
        res.json(book[0]);
        
      } catch(err) {
        res.json(err)
      }
    })
    
    .post(async (req, res) => {
      try {
        const comment = req.body.comment;
        let id = req.params.id;

        if(!id || !comment) return res.send('please enter an id and comment');
        id = new ObjectId(id);

        const collection = await connect();
        const updatedBook = await collection.findAndModify(
          {_id: id},
          {},
          {$push: { comments: comment }},
          {new: true, upsert: false}
        )
        if(!updatedBook) return res.send('sorry could not add comment. try again! thanks')  
        res.json(updatedBook.value);

      } catch(err) {
        res.json(err)
      }
    })
    
    .delete(async (req, res) => {
      try {
        let id = req.params.id;

        if(!id) return res.send('please enter an id');
        id = new ObjectId(id); 

        const collection = await connect();
        const deletedBook = collection.findOneAndDelete({_id:id})

        if (!deletedBook) return res.send('could not delete '+ id);
        res.send('delete successful') 

      } catch(err) {
        res.json(err)
      }
    });
  
};
