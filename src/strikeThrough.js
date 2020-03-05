export var strikeThrough = function (recommendation, config, domSelector) {
    var strikeConfigObj = config.products.strike_price_feature;
    var displayPriceObj = strikeConfigObj.new
    var strikeThroughObj = strikeConfigObj.old;
    var discountObj = strikeConfigObj.discount;
    var oldPrice = recommendation[strikeThroughObj.field];
    var oldPricePrefObject = strikeThroughObj.prefix;
    var currentPrice = recommendation[displayPriceObj.field];
    // if old price exists
    var priceHtml = "";
    if(oldPrice && oldPrice > currentPrice){
      priceHtml = "<p class='_unbxd_strike_through_container'><span class='_unbxd_strike_through_prefix'>"+ oldPricePrefObject.text+"</span><span class='_unbxd_strike_through_text'>" + config.products.currency +  oldPrice +"</span></p>";
      priceHtml += "<p class='_unbxd_original_price_container'>"+ displayObjectText(displayPriceObj)+
        displayOriginalPrice(config, currentPrice) +    
        "</p>" + displayDiscountText(discountObj, oldPrice, currentPrice, config, domSelector);
      // calling paint and reflow for original and old price  
      styleStrikeThroughItems(config, domSelector);
    }
    else{
      priceHtml = "<p class='_unbxd_original_price_container'>"+config.products.currency+ currentPrice +"</p>"
    }
    return priceHtml;
}

function displayOriginalPrice(config, currentPrice){
    return "<span class='_unbxd_original_price_value'>"+config.products.currency+ currentPrice+"</span>";
}

function displayObjectText(displayPriceObj){
    if(displayPriceObj.prefix.text){
        return "<span class='_unbxd_item_display_text'>"+ displayPriceObj.prefix.text +"</span>";
    }
    return "";
}

function displayDiscountText(discountObj, oldPrice, newPrice, config, domSelector){
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
            discountVal = config.products.currency+ discVal;
        }
        if(discountObj.prefix.text){ 
            discountHtml = "<p class='_unbxd_item_discount_text'>"+"<span class='_unbxd_discount_text_label'>"+
            discountObj.prefix.text+"</span>"+"<span class='_unbxd_discount_text_val'>"+discountVal+"</span></p>"
            // calling paint and reflow for discounted price
            styleDiscountedLabels(config, domSelector);
        }
        else{
            discountHtml =  "<p class='_unbxd_discount_text_val'>"+discountVal+"</p>"
        }
    }
    return discountHtml;
}

function styleStrikeThroughItems(config, domSelector){
    setTimeout(function(){
        var strikethroughItems = document.querySelectorAll(domSelector+" ._unbxd_strike_through_text");
        var strikethroughPrefixes =  document.querySelectorAll(domSelector+ " ._unbxd_strike_through_prefix");
        var strikedObjConfStyles = config.products.strike_price_feature.old.value.styles; 
        var strikedPrefixStlyes =  config.products.strike_price_feature.old.prefix.styles;
        for(var i=0; i<strikethroughItems.length; i++){
            (function(index){
                var stylesArr = Object.keys(strikedObjConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    strikethroughItems[index].style[stylesArr[j]] = strikedObjConfStyles[stylesArr[j]];
                }
            })(i);
        }
        for(var i=0; i<strikethroughPrefixes.length; i++){
            (function(index){
                var stylesArr = Object.keys(strikedPrefixStlyes);
                for(var j=0; j<stylesArr.length; j++){
                    strikethroughPrefixes[index].style[stylesArr[j]] = strikedPrefixStlyes[stylesArr[j]];
                }
            })(i);
        }
    },0);
    
    setTimeout(function(){
        var originalItems = document.querySelectorAll(domSelector+ " ._unbxd_original_price_value");
        var originalConfStyles = config.products.strike_price_feature.new.value.styles;      
        var originalItemsPrefix = document.querySelectorAll(domSelector + " ._unbxd_item_display_text");
        var originalPrefixConfStyles = config.products.strike_price_feature.new.prefix.styles;       
        for(var i=0; i<originalItems.length; i++){
            (function(index){
                var stylesArr = Object.keys(originalConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    originalItems[index].style[stylesArr[j]] = originalConfStyles[stylesArr[j]];
                }
            })(i);
        }
        for(var i=0; i<originalItemsPrefix.length; i++){
            (function(index){
                var stylesArr = Object.keys(originalPrefixConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    originalItemsPrefix[index].style[stylesArr[j]] = originalPrefixConfStyles[stylesArr[j]];
                }
            })(i);
        }
    }, 0);
}

function styleDiscountedLabels(config, domSelector){
    setTimeout(function(){
        var discountedLabels = document.querySelectorAll(domSelector+" ._unbxd_discount_text_val");
        var discountedObjConfStyles = config.products.strike_price_feature.discount.value.styles;
        var discountedLabelsPrefix = document.querySelectorAll(domSelector+" ._unbxd_discount_text_label");
        var discountedObjPrefixConfStyles = config.products.strike_price_feature.discount.prefix.styles;
        for(var i=0; i<discountedLabels.length; i++){
            (function(index){
                var stylesArr = Object.keys(discountedObjConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    discountedLabels[index].style[stylesArr[j]] = discountedObjConfStyles[stylesArr[j]];
                }
            })(i);
        }
        for(var i=0; i<discountedLabelsPrefix.length; i++){
            (function(index){
                var stylesArr = Object.keys(discountedObjPrefixConfStyles);
                for(var j=0; j<stylesArr.length; j++){
                    discountedLabelsPrefix[index].style[stylesArr[j]] = discountedObjPrefixConfStyles[stylesArr[j]];
                }
            })(i);
        }
    }, 0);
    
}