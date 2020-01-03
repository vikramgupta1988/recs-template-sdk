const express = require('express');
const cors = require('cors');

const recommendations = require('./recommendations');
const recommendationsNew = require('./recommendations-new');

const app = express();
app.use(cors());
const PORT = 4201;

app.use(express.static(__dirname+'/public'));

app.get('/:sitekey/:apiKey/items' ,(req,res)=>{
//    res.json(recommendations);
res.json(recommendationsNew);
});

app.listen(PORT, ()=>{
    console.log("mock server listening on port", PORT);
})

