import './dot';
import {eventHandlers, setImagesSource, sendWarning } from './handlers';
import {style} from './config';
import {getRatings} from './ratings';
import fullStar from './images/full-star.png';
import halfStar from './images/half-star.png';
import emptyStar from './images/empty-star.png';
import sliderPrev from './images/recs-slider-prev.png';
import sliderNext from './images/recs-slider-next.png';

(function (global) {

    /**
     * Global declaration section
     */

    /** Function for fetching api requests */ 
    function fetchData(url,cb){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
               // Typical action to be performed when the document is ready:
               cb(null, xhttp.responseText);
            }
            else if(this.readyState == 4 && (this.status != 200 || this.status !=204 )){
               cb('error');
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }


    /** Global variables */
    // the domain url
    var platformDomain = 'http://localhost:4201/';

    // Declaration of template containers
    var widget1;
    var widget2;
    var widget3;

    // Horizontal template config containers
    var horizontalConfig;
    var horizontalAssets;
    // Setting constant values for margin between slider items and the DOM id for the slider
    var margin=10;
    var recsSliderId='recs-slider';
    /** End of Global variables */

    /**
     * End of Global declaration section
     */
   
    /** Scripts and styles that are appended to the DOM */

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

    /** End of Scripts and styles that are appended to the DOM */


    /** exporting a global function to initialize recs slider */ 
    global.recsSliderInit = function(options){
        /** Template rendering logic */
        var template = options.template;
        var targetDOMElementId = options.targetDOMElementId;
        var recommendations = options.recommendations;
        var heading = options.heading;
        var itemsToShow = options.itemsToShow;

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
        var domSelector = "#"+targetDOMElementId + " #recs-slider-container";
        var sliderContainer = document.querySelector(domSelector);
        if(!sliderContainer){
            return sendWarning('The slider container id was not found. Script can not continue');
        }

        var sliderItemWidth = (sliderContainer.offsetWidth - (itemsToShow * margin)) / itemsToShow;
        var sliderItemSelector = "#"+targetDOMElementId+ " .recs-slider__item";
        var sliderItems = document.querySelectorAll(sliderItemSelector);
        if(!sliderItems.length){
            return sendWarning('Found 0 nodes with class "recs-slider__item"');
        }
        for(var i=0; i<sliderItems.length; i++){
            sliderItems[i].style.width = sliderItemWidth + 'px';
        }

        var tileWidth = sliderItems[0].offsetWidth;
        var recsSliderSelector = "#"+targetDOMElementId+ " #"+recsSliderId
        var recsSlider = document.querySelector(recsSliderSelector);
        if(!recsSlider){
            return sendWarning('Slider Parent id was not found in the DOM');
        }

        recsSlider.style.width = (recommendations.length * tileWidth) + (recommendations.length) * margin +'px';
        
        /** Setting styles for carousel buttons */
        // the navigation button need to be hidden in case the total no of items to be shown
        // are less than the no of items to be shown at in one slide 
        if(recommendations.length <= itemsToShow){
            var navigationButtonSelector = "#"+targetDOMElementId + " .recs-slider-btn";
            var navigationButtons = document.querySelectorAll(navigationButtonSelector);
            if(!navigationButtons || !navigationButtons.length){
                return sendWarning('recs-slider-btn class not found on navigation buttons');
            }
            for(var i=0; i<navigationButtons.length; i++){
                navigationButtons[i].style.display = 'none';
            }
        } 

        // the previous button for the slider needs to be disabled initially
        var prevSliderButtonSelector = "#"+targetDOMElementId + " .rex-slider--prev";
        var prevSliderButton = document.querySelector(prevSliderButtonSelector);

        if(!prevSliderButton){
            return sendWarning('rex-slider--prev class was not found on the navigation buttons');
        }
        prevSliderButton.disabled = true;
        
       

        /** Setting images value */
        var imgArr = [];
        var classMap = {
            "next_arrow":"rex-slider--next",
            "prev_arrow":"rex-slider--prev",
            "empty_rating":"rex-empty-star",
            "half_rating":"rex-half-star",
            "full_rating":"rex-full-star"
        }
        for(i=0;i<horizontalAssets.length;i++){
            var horizontalAssetItem = horizontalAssets[i];
            imgArr.push(
                {
                    classname: classMap[horizontalAssetItem.tag],
                    url: horizontalAssetItem.src
                }
            );
        }
        setImagesSource(imgArr,targetDOMElementId);

        /** Setting images value end*/

        /** Setting styles for heading */

        var headingSelector = "#"+targetDOMElementId+" #recs-slider-heading";
        var hzStyleConfig = horizontalConfig.header;
        var hzHeadingEl = document.querySelector(headingSelector);
        hzHeadingEl.style.textAlign = hzStyleConfig.alignment;
        hzHeadingEl.style.fontSize = hzStyleConfig.text.size.value + hzStyleConfig.text.size.unit;
        hzHeadingEl.style.fontWeight = hzStyleConfig.text.style;
        hzHeadingEl.style.color = hzStyleConfig.text.colour;

        /** End of Setting styles for heading */

    }


     /** The initialization function that has to be exposed to the merchandizer website
         *  it takes context object from the client html
         *  and makes a call to the recommender proxy
         *  and updates the dom as per the response
         */
        global.unbxdTemplateInit =  function(context){
            var widgets = context.widgets;
            // container for no of items to be shown
            var itemsToShow;

            if(!widgets){
                throw new Error("Widgets information is missing");
            }

            // retrieve ids for widget containers
            widget1 = widgets.widget1;
            widget2 = widgets.widget2;
            widget3 = widgets.widget3;

            if(!widget1 && !widget2 && !widget3){
                throw new Error('No widget id provided');
            }

            // getting userId, siteKey and apiKey
            var userInfo = context.userInfo;
            if(!userInfo){
                throw new Error("User info missing")
            }

            var userId = userInfo.userId;
            var siteKey = userInfo.siteKey;
            var apiKey = userInfo.apiKey;

            var requestUrl = platformDomain + apiKey + "/" + siteKey+ '/items?pageType=';

            if(!userId){
                throw new Error("user id is missing");
            }

            if(!siteKey){
                throw new Error("site Key is missing");
            }

            if(!apiKey){
                throw new Error("api key is missing");
            }


            // getting page info
            
            var pageInfo = context.pageInfo;

            if(!pageInfo){
                throw new Error("Page info missing")
            }

            var pageType = pageInfo.pageType;
            // check if the value for page type is valid
            var allowedPageTypes = ["HOME", "CATEGORY", "PRODUCT", "CART", "BRAND"];
            if(allowedPageTypes.indexOf(pageType) == -1){
               throw error("Invalid value for page type");
            }
            
          
            requestUrl += pageType
            switch (pageType){
                case "PRODUCT":
                case "CART":    
                    var productId = pageInfo.productId;
                    if(!productId){
                        throw new Error("product id is missing for page type:" + pageType);
                    }
                    requestUrl += "&id="+productId;
                    break;
                case "CATEGORY":
                    var catlevel1Name = pageInfo.catlevel1Name;
                    if(!catlevel1Name){
                        throw new Error("catlevel1Name is mandatory for page type:"+pageType);
                    }
                    var catlevel2Name = pageInfo.catlevel2Name;
                    var catlevel3Name = pageInfo.catlevel3Name;
                    var catlevel4Name = pageInfo.catlevel4Name;
                    var categoryUrl = "&catlevel1Name="+catlevel1Name;
                    categoryUrl += catlevel2Name ? ("&catlevel2Name="+catlevel2Name) : "";
                    categoryUrl += catlevel3Name ? ("&catlevel3Name="+catlevel3Name) : "";
                    categoryUrl += catlevel4Name ? ("&catlevel4Name="+catlevel4Name) : "";
                    requestUrl += categoryUrl;
                    break;
                case "BRAND":
                    var brand = pageInfo.brand;
                    if(!brand){
                        throw new Error("brand is mandatory for page type:"+pageType);
                    }    
                    requestUrl += "&brand="+brand;
                break;    
            }

            requestUrl += "&uid="+userId;

            function renderWidgetDataHorizontal(targetDOMElementId, recommendations, heading){
                var options = {
                    template: horizontalTemplate,
                    targetDOMElementId: targetDOMElementId,
                    recommendations: recommendations,
                    heading: heading,
                    itemsToShow: itemsToShow
                }
                recsSliderInit(options);
            }

            function handleWidgetRendering(){
                if(widget1){
                    var widget1Data = recommendationsResponse.rex_data.widget1;
                    var widget1Heading = widget1Data.title;
                    var widget1Recommendations = widget1Data.recommendations;
                    renderWidgetDataHorizontal(widget1, widget1Recommendations, widget1Heading);
                }
                if(widget2){
                    var widget2Data = recommendationsResponse.rex_data.widget2;
                    var widget2Heading = widget2Data.title;
                    var widget2Recommendations = widget2Data.recommendations;
                    renderWidgetDataHorizontal(widget2, widget2Recommendations, widget2Heading);
                }
            }

            function horizontalTemplateHandler(err, res){
                if(err){
                    throw new Error('Failed to fetch templates');
                }
                // populating the template string
                horizontalTemplate = res;
                handleWidgetRendering();  
            }

            /** Fetch recomendations response */
            // to store recommendations response
            var recommendationsResponse;
            // to store template string
            var horizontalTemplate;
            fetchData(requestUrl, function(err, res){
                if(err){
                    throw new Error('Failed to fetch recommendations');
                }
                recommendationsResponse = JSON.parse(res);
               
                var horizontalTemplate = recommendationsResponse.horizontal;
                horizontalConfig = horizontalTemplate.configuration;
                horizontalAssets = horizontalTemplate.assets;
                itemsToShow = horizontalConfig.products.visible_products;
                var templateUrlHorizontal = horizontalTemplate.layout.src;
                
                /** Fetch template layout string */
                fetchData(templateUrlHorizontal,horizontalTemplateHandler);
               
            });   
            
        }
})(window);


