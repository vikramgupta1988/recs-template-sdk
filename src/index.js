import './dot';
import {eventHandlers, setImagesSource, appendImageToId, sendWarning } from './handlers';
import {recommendations, template, style, configuration} from './config';
import {getRatings} from './ratings';
import fullStar from './images/full-star.png';
import halfStar from './images/half-star.png';
import emptyStar from './images/empty-star.png';
import sliderPrev from './images/recs-slider-prev.png';
import sliderNext from './images/recs-slider-next.png';


(function (global) {
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
         /****  Handling the heading section configuration */ 
        // check if the heading has an image url then show it as an image otherwise continue

        // var { imgUrl: headingImgUrl, targetId: headingParentId = "recs-slider-heading" } = heading;

        // if(headingImgUrl){
        //     var targetHeadingParentEl = document.getElementById(headingParentId);
        //     if(!targetHeadingParentEl){
        //         return sendWarning('The parent id to attach image was not found. Image could not be attached');
        //     }
        //     document.getElementById(headingParentId).innerText = "";
        //     appendImageToId(headingParentId, headingImgUrl);
        // }


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

    }

    // initializing the slider inside the DOM
    recsSliderInit(targetDOMElementId, recommendations, heading);
})(window);


