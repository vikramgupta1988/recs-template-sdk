export const getRatings = (rating) => {
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
        const result = rating / 0.5;
        let fullStars=0;
        let halfStars =0;
        let emptyStars = 0;
        let resultString = '';
        if(result % 2 !== 0){
            halfStars = 1;
        }
        fullStars = Math.floor(result / 2);
        emptyStars = 5 - (fullStars + halfStars); 
        for(let i=0; i< fullStars; i++){
            resultString += '<span class="full-star recs-star"></span>';
        }
        for(let i=0; i< halfStars; i++){
            resultString += '<span class="half-star recs-star"></span>';
        }
        for(let i=0; i< emptyStars; i++){
            resultString += '<span class="empty-star recs-star"></span>';
        }
        return resultString;
}

