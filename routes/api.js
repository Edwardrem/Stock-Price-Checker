/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Joi = require('joi');

const URL = process.env.DB; //MongoClient.connect(CONNECTION_STRING, err, db)  => {});

function validate(req) {
  const schema = {
    issue_title : Joi.string().min(3).max(50).required(),
    issue_text  : Joi.string().min(3).max(255).required(),
    created_by  : Joi.string().min(3).max(255).required(),
    assigned_to : Joi.string().max(30).allow(''),
    status_text : Joi.string().max(30).allow('')
  };

  return Joi.validate(req, schema, { stripUnknown: true });
}

async function connect(project) {
  const db = await MongoClient.connect(URL, { useNewUrlParser: true })
  return db.collection(project);
}

module.exports = (app) => {

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {
      try{
        const project = req.params.project;
        const q = req.query;

        if(q._id) q._id = new ObjectId(q._id)
        if(q.open) q.open = q.open === "true"

        const collection = await connect(project);
        collection.find(q).toArray((err, docs) => res.json(docs));

      } catch(err){
        res.json(err)
      }
    })
    
    .post(async (req, res) => {
      try {
        const project = req.params.project;
        const {issue_title, issue_text, created_by, assigned_to, status_text} = req.body
        const issue = {
          issue_title,
          issue_text,
          created_by,
          created_on  : new Date(),
          updated_on  : new Date(),
          assigned_to : assigned_to || '',
          status_text : status_text || '',
          open        : true
        };

        const { error } = validate(issue);
        if (error) return res.send(error.details[0].message);

        const collection = await connect(project);
        const insertedIssue = collection.insertOne(issue)
        if(!insertedIssue) return res.send('sorry could not add issue. try again! thanks')
        
        issue._id = insertedIssue.insertedId;
        res.json(issue);

      } catch(err) {
        res.json(err)
      }
      
    })
    
    .put(async (req, res) => {
      try{
        const project = req.params.project;
        const id      = req.body._id;
        let updates = req.body;
        
        delete updates._id;
        for (let key in updates) { 
          if (!updates[key]) delete updates[key] 
        }
        if(updates.open) updates.open = updates.open === "true"
        if(Object.keys(updates).length === 0) return res.send('no updated field sent');
        updates.updated_on = new Date();
        
        const collection = await connect(project);
        const issue = await collection.findOne({_id : new ObjectId(id)})
        if(!issue) return res.send('could not find ' + id)
        
        delete issue._id;
        updates = {...issue, ...updates}
        
        const { error } = validate(updates);
        if (error) return res.send(error.details[0].message);
        
        const update = await collection.update({_id : new ObjectId(id)}, updates)
        if(!update) return res.send('could not update ' + id)

        res.send('successfully updated')
        
      } catch(err){
        res.json(err)
      }
      
    })
    
    .delete(async (req, res) => {
      try{
        const project = req.params.project;
        const id = req.body._id;

        if(!id) return res.send('_id error');

        const collection = await connect(project);
        const deletedIssue = await collection.findAndRemove({_id: new ObjectId(id)});

        if (!deletedIssue) return res.send('could not delete '+ id);
        res.send('deleted '+ id) 
        
      } catch(err) {
        res.json(err)
      }
    });
    
};
