const express = require('express');
const cors = require('cors');

const recommendations = require('./recommendations');

const app = express();
app.use(cors());
const PORT = 4201;

app.use(express.static(__dirname+'/public'));

app.get('/items' ,(req,res)=>{
   res.json(recommendations);
});

app.listen(PORT, ()=>{
    console.log("mock server listening on port", PORT);
})

