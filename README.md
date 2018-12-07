# compound-test

To test locally:
  1. cd client
  2. npm i
  3. npm run serve
  4. Then visit the page at localhost:3000.

The server is up and running on lambda, but if you'd like to test it locally:
  1. cd server
  2. Request a .env from me or populate one with the following values:
      * CAPTCHA_SECRET
      * AWS_ACCESS_KEY_ID
      * AWS_SECRET_ACCESS_KEY
      * AWS_DEFAULT_REGION 
  3. npm i
  4. npm run local
  
      This will start the server at localhost:8080, but you'll need to change the serverUrl variable in ../client/index.js
    
