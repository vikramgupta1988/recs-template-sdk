const express = require('express');
const cors = require('cors');

const recommendations = require('./recommendations');
const recommendationsNew = require('./recommendations-new');

const app = express();
var corsOptions = {
    allowedHeaders: ['x-request-id'],
    exposedHeaders: ['x-request-id']
  }
app.use(cors(corsOptions));
const PORT = 4201;

app.use(express.static(__dirname+'/public'));

app.get('/:sitekey/:apiKey/items' ,(req,res)=>{
//    res.json(recommendations);
res.setHeader('x-request-id', 123);
res.json(recommendationsNew);
});

app.listen(PORT, ()=>{
    console.log("mock server listening on port", PORT);
})

