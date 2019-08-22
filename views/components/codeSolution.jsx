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

  const q1 = `app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  }
}));`
  
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
  
  const q3_1 = `suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {

      test('1 stock', (done) => {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
         
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
         
          assert.isNumber(res.body.stockData.likes, 'how many likes');
          
          done();
        });
      });
      
      let likes;
      
      test('1 stock with like', (done) => {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
         
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
         
          assert.isNumber(res.body.stockData.likes, 'how many likes');
          
          assert.isAbove(res.body.stockData.likes, 0);
         
          likes = res.body.stockData.likes;
         
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.equal(res.body.stockData.likes, likes);
          
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          
          assert.isNumber(res.body.stockData.likes, 'how many likes');
          
          done();
        });
      });
      
      
      test('2 stocks', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog','msft']})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'GOOG');
          assert.equal(res.body.stockData[1].stock, 'MSFT');
          
          assert.isArray(res.body.stockData);
          
          assert.property(res.body.stockData[0], 'stock');
          assert.property(res.body.stockData[0], 'price');
          assert.property(res.body.stockData[0], 'rel_likes');
          assert.property(res.body.stockData[1], 'stock');
          assert.property(res.body.stockData[1], 'price');
          assert.property(res.body.stockData[1], 'rel_likes');
          
          assert.isNumber(res.body.stockData[0].rel_likes, 'compare likes');
          assert.isNumber(res.body.stockData[1].rel_likes, 'compare likes');
          
          done();
        });
      });
      
      test('2 stocks with like', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog','msft'], like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'GOOG');
          assert.equal(res.body.stockData[1].stock, 'MSFT');
          
          assert.isArray(res.body.stockData);
          
          assert.property(res.body.stockData[0], 'stock');
          assert.property(res.body.stockData[0], 'price');
          assert.property(res.body.stockData[0], 'rel_likes');
          assert.property(res.body.stockData[1], 'stock');
          assert.property(res.body.stockData[1], 'price');
          assert.property(res.body.stockData[1], 'rel_likes');
          
          assert.isNumber(res.body.stockData[0].rel_likes, 'compare likes');
          assert.isNumber(res.body.stockData[1].rel_likes, 'compare likes');
          
          done();
        });
      });
      
    });

});`
  
  const q3_2 = `  Functional Tests

    GET /api/stock-prices => stockData object

      ✓ 1 stock (638ms)

      ✓ 1 stock with like (328ms)

      ✓ 1 stock with like again (ensure likes arent double counted) (204ms)

      ✓ 2 stocks (476ms)

      ✓ 2 stocks with like (611ms)



  5 passing (2s)`
  
export default CodeSolution;