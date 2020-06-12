const express = require('express');
const cors = require('cors');

// const recommendations = require('./recommendations');
const recommendationsNew = require('./recommendations-new');
const recommendationsMobile = require('./recommendationsMobile');
const recommendationsMobileInfinite =  require('./recommendationsMobileInfinite');

const app = express();
app.use(cors());
const PORT = 4201;

app.get('/:sitekey/:apiKey/items' ,(req,res,next)=>{
    //var templateType = req.query.templateType;
    var unbxdDeviceType = req.headers['unbxd-device-type']; 
    if(unbxdDeviceType === "desktop-browser"){
        console.log("&&&&&&&&&&&&&&&", unbxdDeviceType);
        res.json(recommendationsNew);
    }else{
        console.log("&&&&&&&&&&&&&&&", unbxdDeviceType);
        //res.json(recommendationsMobile);
        res.json(recommendationsMobileInfinite);
   }
    next();
});

app.use(express.static(__dirname+'/public'));

app.listen(PORT, ()=>{
    console.log("mock server listening on port", PORT);
})

