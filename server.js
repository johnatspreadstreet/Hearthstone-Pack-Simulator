'use strict';

const express = require('express');

const { PORT } = require('./config');
const cardsRouter = require('./router/cards.router');

const app = express();
const cors = require('cors');

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Allow CORS
app.use(cors());

// Mount router on "/api"
app.use('/api', cardsRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});
  
app.startServer = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};
  
// Listen for incoming connections
if (require.main === module) {
  app.startServer(PORT).catch(err => {
    if (err.code === 'EADDRINUSE') {
      const stars = '*'.repeat(80);
      console.error(`${stars}\nEADDRINUSE (Error Address In Use). Please stop other web servers using port ${PORT}\n${stars}`);
    }
    console.error(err);
  });
}
  
module.exports = app; // Export for testing