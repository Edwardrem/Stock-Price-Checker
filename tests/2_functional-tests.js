/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
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

});
