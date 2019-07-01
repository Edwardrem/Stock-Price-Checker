const axios = require('axios');
const db = require('../models') 

const APIURL = `https://cloud.iexapis.com/stable/stock/`;
const DBURI  = process.env.DB;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function getPrice(symbol) {
 const result = await axios.get(APIURL + symbol + '/quote?token=' + SECRET_TOKEN)
 return result.data.latestPrice
}

async function getLikes(symbol) {
 const likes = await db.Stock.find({symbol}).select({likes: 1, _id: 0});
 return likes[0] !== undefined ? likes[0].likes : 0;
}

async function handleLike(stock, ip) {
  const p = [];
  stock = Array.isArray(stock) ? stock : [stock];
  
  stock.forEach(symbol => p.push(addlike(symbol, ip)))
  await Promise.all(p)
}

async function addlike(symbol, ip) {
  const find = await db.Stock.find({symbol, ips: ip})
  
  if(find.length !== 0) return
    
  const update = await db.Stock.findOneAndUpdate(
    {symbol},
    {
      $push : {ips   : ip},
      $inc  : {likes : 1 }
    },
    { upsert: true }
  );
  
}


module.exports =  {getPrice, getLikes, handleLike};