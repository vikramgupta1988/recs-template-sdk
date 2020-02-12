export var strikeThrough = function (recommendation, config) {
    var strikeConfigObj = config.striked_price;
    var displayPriceObj = strikeConfigObj.display_price_map
    var strikeThroughObj = strikeConfigObj.strike_price_map;
    var discountObj = strikeConfigObj.discount_map;
    var oldPrice = recommendation[strikeThroughObj.unbxd_key];
    var currentPrice = recommendation[displayPriceObj.unbxd_key];
    // if old price exists
    var priceHtml = "";
    if(oldPrice && oldPrice > currentPrice){
      priceHtml = "<p class='_unbxd_strike_through_text'>"+ config.currency + oldPrice +"</p>";
      priceHtml += "<p class='_unbxd_original_price_container'>"+ displayObjectText(displayPriceObj)+
        config.currency+ currentPrice +    
        displayDiscountText(discountObj, oldPrice, currentPrice, config)+
        "</p>";
      // calling paint and reflow for original and old price  
      styleStrikeThroughItems(config);
    }
    else{
      priceHtml = "<p class='_unbxd_original_price_container'>"+config.currency+ currentPrice +"</p>"
    }
    return priceHtml;
}

function displayObjectText(displayPriceObj){
    if(displayPriceObj.text){
        return "<span class='_unbxd_item_display_text'>"+ displayPriceObj.text + ": "+"</span>";
    }
    return "";
}

function displayDiscountText(discountObj, oldPrice, newPrice, config){
    var discountHtml = "";
    if(discountObj.enabled){
        var mode = discountObj.mode;
        var discountVal = 0;
        if(mode == "percentage"){
            var discPercent = ((oldPrice - newPrice)/ oldPrice) * 100;
            discountVal = discPercent % 1 === 0 ? discPercent : parseFloat(discPercent).toFixed(2);
            discountVal += "%";
        }
        else{
            var discVal = oldPrice - newPrice;
            discVal = discVal % 1 === 0 ? discVal : parseFloat(discVal).toFixed(2);
            discountVal = config.currency+ discVal;
        }
        if(discountObj.text){ 
            discountHtml = "<p class='_unbxd_item_discount_text'>"+"<span class='_unbxd_discount_text_label'>"+
            discountObj.text+": "+"</span>"+"<span class='_unbxd_discount_text_val'>"+discountVal+"</span></p>"
            // calling paint and reflow for discounted price
            styleDiscountedLabels(config);
        }
        else{
            discountHtml =  "<p class='_unbxd_item_discount_text'>"+discountVal+"</p>"
        }
    }
    return discountHtml;
}

function styleStrikeThroughItems(config){
    setTimeout(function(){
        var strikethroughItems = document.querySelectorAll("._unbxd_strike_through_text");   
        var strikedObjConfStyles = config.striked_price.strike_price_map.styles;  
        for(var i=0; i<strikethroughItems.length; i++){
            (function(index){
                var stylesArr = Object.keys(strikedObjConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    strikethroughItems[index].style[stylesArr[j]] = strikedObjConfStyles[stylesArr[j]];
                }
            })(i);
        }
    },0);
    
    setTimeout(function(){
        var originalItems = document.querySelectorAll("._unbxd_original_price_container");
        var originalConfStyles = config.striked_price.display_price_map.styles;
        for(var i=0; i<originalItems.length; i++){
            (function(index){
                originalItems[index].style.color = originalConfStyles.color;
                originalItems[index].style.fontSize = originalConfStyles.font_size;
            })(i);
        }
    }, 0);
}

function styleDiscountedLabels(config){
    setTimeout(function(){
        var discountedLabels = document.querySelectorAll("._unbxd_item_discount_text");
        var discountedObjConfStyles = config.striked_price.discount_map.styles;
        for(var i=0; i<discountedLabels.length; i++){
            (function(index){
                discountedLabels[index].style.color = discountedObjConfStyles.color;
                discountedLabels[index].style.fontSize = discountedObjConfStyles.font_size;
            })(i)
        }
    }, 0);
    
}