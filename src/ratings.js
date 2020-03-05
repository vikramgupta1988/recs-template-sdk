export var getRatings = function(rating){
        if(isNaN(rating)){
            throw new Error("Invalid rating value provided");
        }
        // Divide the rating by 0.5
        // if the result is an even no e.g 8
        //  // divide the no by 2. this will be our full stars
        //  // our empty stars will be 5 - (full stars)
        // else when the no is odd e.g 7
        //  // divide the no by 2 and floor the result. This will be the total no of full stars;
        //  // half star will be one
        //  // empty stars will be 5 - (full stars + half stars)
        var result = rating / 0.5;
        var fullStars=0;
        var halfStars =0;
        var emptyStars = 0;
        var resultString = '';
        if(result % 2 !== 0){
            halfStars = 1;
        }
        fullStars = Math.floor(result / 2);
        emptyStars = 5 - (fullStars + halfStars); 
        for(var i=0; i< fullStars; i++){
            resultString += '<span class="_unbxd_rex-full-star recs-star _unbxd_rating-item"></span>';
        }
        for(var i=0; i< halfStars; i++){
            resultString += '<span class="_unbxd_rex-half-star recs-star _unbxd_rating-item"></span>';
        }
        for(var i=0; i< emptyStars; i++){
            resultString += '<span class="_unbxd_rex-empty-star recs-star _unbxd_rating-item"></span>';
        }
        return resultString;
}

function getRatingValuePrefixed(recommendation,ratingConfig){
    return "<span class='_unbxd-rating-value-container'><span class='_unbxd-rating-value-prefix _unbxd_rating-item'>"+
          ratingConfig.prefix.text + "</span><span class='_unbxd-rating-value'>"
          +  recommendation[ratingConfig.field]
          + "</span></span>"
}

function styleRatingValue(domSelector, ratingConfig){
    setTimeout(function(){
        var prefixItemsStyles = document.querySelectorAll(domSelector + " ._unbxd-rating-value-prefix");
        var valueItemStyles = document.querySelectorAll(domSelector + " ._unbxd-rating-value");
        for(var i=0; i< prefixItemsStyles.length; i++){
            (function(index){
                var stylesArr = Object.keys(ratingConfig.prefix.styles);
                for(var j=0; j<stylesArr.length; j++){
                    prefixItemsStyles[index].style[stylesArr[j]] = ratingConfig.prefix.styles[stylesArr[j]];
                }
            })(i);
            (function(index){
                var stylesArr = Object.keys(ratingConfig.value.styles);
                for(var j=0; j<stylesArr.length; j++){
                    valueItemStyles[index].style[stylesArr[j]] = ratingConfig.value.styles[stylesArr[j]];
                }
            })(i);
        }
    },0);
}


export var getRatingContent = function(recommendation, ratingConfig, domSelector){
    var ratingData="";
    // if type selected is value only
        if(ratingConfig.type === "value"){
           ratingData = getRatingValuePrefixed(recommendation, ratingConfig, domSelector);
           styleRatingValue(domSelector, ratingConfig);
        }
    // if type selected is image only
        else if(ratingConfig.type === "image"){
           ratingData = getRatings(recommendation[ratingConfig.field])
        }
    // else both
        else{
            // if image comes first
            if(ratingConfig.sequence[0] === "image"){
                ratingData = getRatings(recommendation[ratingConfig.field]) +
                "<br>" +
                getRatingValuePrefixed(recommendation, ratingConfig, domSelector);
            }
            // else 
            else{
                ratingData = getRatingValuePrefixed(recommendation, ratingConfig, domSelector) +
                "<br>" +
                getRatings(recommendation[ratingConfig.field]);
            }
            styleRatingValue(domSelector, ratingConfig);
        }
     
    return ratingData;  
}