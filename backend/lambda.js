const serverless = require('serverless-http');
const app = require('./index');

// Export the handler for AWS Lambda
module.exports.handler = serverless(app, {
  binary: ['image/*', 'application/pdf']
});