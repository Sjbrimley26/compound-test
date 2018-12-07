const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');
exports.handler = (event, context) => {
  app.ready((err) => {
    console.log(err ? err : "Ready!");
    return awsServerlessExpress.proxy(app.server, event, context)
  })
};
