import './dot';
import {eventHandlers, setImagesSource, appendImageToId, sendWarning } from './handlers';
import {recommendations, template, style, configuration} from './config';
import {getRatings} from './ratings';
import fullStar from './images/full-star.png';
import halfStar from './images/half-star.png';
import emptyStar from './images/empty-star.png';
import sliderPrev from './images/recs-slider-prev.png';
import sliderNext from './images/recs-slider-next.png';

// unbxd-template-init({widget1:null, widget2:null, widget3:null, pageType:null, userId:null,
// productId:null, siteKey:null, apiKey: null})

(function (global) {
    // the domain url
    var platformDomain = 'http://localhost:4201';

    // Declaration of template containers
    var widget1;
    var widget2;
    var widget3;
    /***** Getting Configuration Data */
    // Getting configuration data here
    // 1 - targetDOMElementId: this is the target id of the element where you want to render this 
    //     slider
    // 2 - heading: the heading title that has to appear above the slider. This can be text as
    //     well as an image
    // 3- itemsToShow: the no of items that need to be displayed in the slider at once
    var targetDOMElementId = configuration.targetDOMElementId;
    var heading = configuration.heading;
    var itemsToShow = configuration.itemsToShow;

    // Setting constant values for margin between slider items and the DOM id for the slider
    var margin=10;
    var recsSliderId='recs-slider';

    /** Adding event handlers for the horizontal slider to the DOM */
    var eventHandlerScript = document.createElement('script');
    eventHandlerScript.type = 'text/javascript';
    // innerHTML needs to stay as es5 since it will be embedded duirectly to client's browser
    eventHandlerScript.innerHTML = eventHandlers.recsSliderSideScroll + '\n' + eventHandlers.recsSliderScrollNext + '\n' +eventHandlers.recsSliderScrollPrev +'\n';
    document.body.appendChild(eventHandlerScript);

    /** Attaching styles for the slider */
    var eventHandlerStyle = document.createElement('style');
    eventHandlerStyle.type = 'text/css';
    // innerHTML needs to stay as es5 since it will be embedded duirectly to client's browser
    eventHandlerStyle.innerHTML = style;
    document.head.appendChild(eventHandlerStyle);


    // exporting a global function to initialize recs slider
    global.recsSliderInit = function(targetDOMElementId, recommendations, heading, itemClickHandler){
        // appending the tempate data as html to DOM
        var renderFn = doT.template(template);
        var renderTargetEl = document.getElementById(targetDOMElementId);
        if(!renderTargetEl){
            return sendWarning('The target element id is not present in DOM. Execution can not continue');
        }

        document.getElementById(targetDOMElementId).innerHTML = renderFn({
            recommendations: recommendations, 
            heading:heading, getRatings:getRatings
        });

        /** Dynamically adjusting width based on no of items to be shown */

        var sliderContainer = document.querySelector('#recs-slider-container');
        if(!sliderContainer){
            return sendWarning('The slider container id was not found. Script can not continue');
        }

        var sliderItemWidth = (sliderContainer.offsetWidth - (itemsToShow * margin)) / itemsToShow;
        var sliderItems = document.querySelectorAll(".recs-slider__item");
        if(!sliderItems.length){
            return sendWarning('Found 0 nodes with class "recs-slider__item"');
        }
        for(var i=0; i<sliderItems.length; i++){
            sliderItems[i].style.width = sliderItemWidth + 'px';
        }

        var tileWidth = sliderItems[0].offsetWidth;
        var recsSlider = document.getElementById(recsSliderId);
        if(!recsSlider){
            return sendWarning('Slider Parent id was not found in the DOM');
        }

        recsSlider.style.width = (recommendations.length * tileWidth) + (recommendations.length) * margin +'px';
        
        /** Setting styles for carousel buttons */
        // the navigation button need to be hidden in case the total no of items to be shown
        // are less than the no of items to be shown at in one slide 
        if(recommendations.length <= itemsToShow){
            var navigationButtons = document.querySelectorAll(".recs-slider-btn");
            if(!navigationButtons || !navigationButtons.length){
                return sendWarning('recs-slider-btn class not found on navigation buttons');
            }
            for(var i=0; i<navigationButtons.length; i++){
                navigationButtons[i].style.display = 'none';
            }
        } 

        // the previous button for the slider needs to be disabled initially
        var prevSliderButton = document.querySelector(".rex-slider--prev");
        if(!prevSliderButton){
            return sendWarning('rex-slider--prev class was not found on the navigation buttons');
        }
        prevSliderButton.disabled = true;
        
        // setting images
        var imgArr = [
            {
                classname: "full-star", 
                url: fullStar
            },
            {
                classname: "half-star", 
                url: halfStar
            },
            {
                classname: "empty-star", 
                url: emptyStar
            },
            {
                classname: "rex-slider--prev", 
                url: sliderPrev
            },
            {
                classname: "rex-slider--next", 
                url: sliderNext
            },

        ];

        setImagesSource(imgArr);
        
        /** The initialization function that has to be exposed to the merchandizer website
         *  it takes context object from the client html
         *  and makes a call to the recommender proxy
         *  and updates the dom as per the response
         */
        global.unbxdTemplateInit =  function(context){
            var widgets = context.widgets;
            var requestUrl = platformDomain + '/items';
            if(!widgets){
                throw error("Widgets information is missing");
            }

            // retrieve ids for widget containers
            widget1 = widgets.widget1;
            widget2 = widgets.widget2;
            widget3 = widgets.widget3;

            if(!widget1 && !widget2 && !widget3){
                throw error('No widget id provided');
            }

            // getting userId, siteKey and apiKey
            var userInfo = context.userInfo;
            if(!userInfo){
                throw error("User info missing")
            }

            var userId = userInfo.userId;
            var siteKey = userInfo.siteKey;
            var apiKey = userInfo.apiKey;

            if(!userId){
                throw error("user id is missing");
            }

            if(!siteKey){
                throw error("site Key is missing");
            }

            if(!apiKey){
                throw error("api key is missing");
            }


            // getting page info
            
            var pageInfo = context.pageInfo;

            if(!pageInfo){
                throw error("Page info missing")
            }

            var pageType = pageInfo.pageType;
            // check if the value for page type is valid
            var allowedPageTypes = ["HOME", "CATEGORY", "PRODUCT", "CART", "BRAND"];
            if(allowedPageTypes.indexOf(pageType) == -1){
               throw error("Invalid value for page type");
            }
            
            var productId = pageInfo.productId;

            switch (pageType){
                case 'PRODUCT':
                    if(!productId){
                        throw error("product id is missing for page type:'PRODUCT'");
                    }
            }

            // if pagetype is product or cart, then it needs to have product id
            if(pageType == 'PRODUCT'){
                if(!productId){
                    throw error("product id is missing for page type:'PRODUCT'");
                }
                
            }
            if((pageType == "PRODUCT" || pageType == "CART") && !productId){
                throw error("product id is missing for page type:'PRODUCT'");
            }

            var catlevel1Name = pageInfo.catlevel1Name;
            var catlevel2Name = pageInfo.catlevel2Name;
            var catlevel3Name = pageInfo.catlevel3Name;
            var catlevel4Name = pageInfo.catlevel4Name;

            // if pagetype is CATEGORY, then it needs to have one of catlevel1Name
            if(pageType == "CATEGORY" && !catlevel1Name){
                throw error("catlevel1Name is mandatory for page type:'CATEGORY'");
            }

            var brand = pageInfo.brand;
            // if pagetype is BRAND, then it needs brand string
            if(pageType == "BRAND" && !brand){
                throw error("barnd is mandatory for page type:'BRAND'");
            }

            //check if all the values are present
    
            // if everything is correct proceed with fetching the response
            var requestUrl = platformDomain + "/items";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   // Typical action to be performed when the document is ready:
                   console.log(JSON.parse(xhttp.responseText));
                }
            };
            xhttp.open("GET", requestUrl, true);
            xhttp.send();
        }

    }

    // initializing the slider inside the DOM
    recsSliderInit(targetDOMElementId, recommendations, heading);
})(window);


