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
            resultString += '<span class="_unbxd_rex-full-star recs-star"></span>';
        }
        for(var i=0; i< halfStars; i++){
            resultString += '<span class="_unbxd_rex-half-star recs-star"></span>';
        }
        for(var i=0; i< emptyStars; i++){
            resultString += '<span class="_unbxd_rex-empty-star recs-star"></span>';
        }
        return resultString;
}

