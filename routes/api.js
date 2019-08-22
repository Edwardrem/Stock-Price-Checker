/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const {getPrice, getLikes, handleLike} = require('../handlers/stock')

const newError = (message, status) => { 
  const error = new Error(message); 
  error.status = status; 
  return error
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res, next) => {
      try {
        let {stock} = req.query;
        if(!stock) return next(newError('you need to add a stock', 400))
        
        stock = Array.isArray(stock) 
          ? stock.map(elm => elm.toUpperCase())
          : stock.toUpperCase() 
        
        if(req.query.like === 'true') {
          await handleLike(stock, req.ip)
        }

        // if two stocks
        if(Array.isArray(stock)) {
          console.log('ok')
          const [price0, likes0, price1, likes1] = await Promise.all(
            [
              getPrice(stock[0]),
              getLikes(stock[0]),
              getPrice(stock[1]),
              getLikes(stock[1])
            ])

          return res.json({
            stockData : [
              { stock : stock[0], price : price0, rel_likes : likes0-likes1 },
              { stock : stock[1], price : price1, rel_likes : likes1-likes0 }
            ]
          })
        }
        
        // if one stock
        const [price, likes] = await Promise.all(
            [
              getPrice(stock),
              getLikes(stock)
            ])

        return res.json({stockData: {stock, price, likes}})
        
      } catch(err) {
        res.json(err)
      }
    });
    
};
