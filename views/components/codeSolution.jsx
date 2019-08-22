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
          
          <li>All 5 functional tests are complete and passing.</li>
          
        </ol>
      </div>   
      
    </div>
  );
}

  const q1 = `app.use(helmet.noCache());`
  
  const q2 = `app.route('/api/stock-prices')
  .get(async (req, res) => {
    try {
      if(!req.query.stock) return res.send('you need to add a stock')

      const stock = Array.isArray(req.query.stock) 
        ? req.query.stock.map(elm => elm.toUpperCase())
        : req.query.stock.toUpperCase() 

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
  });`
  
  
  
export default CodeSolution;