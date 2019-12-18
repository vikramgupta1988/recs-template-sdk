export var eventHandlers = {
    // side scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    recsSliderSideScroll: function recsSliderSideScroll(targetDOMId, direction, speed, step) {
       var scrollAmount = 0;
       var elementSelector = "#"+targetDOMId+ " #recs-slider-container";
       var element = document.querySelector(elementSelector);
       if(!element){
           return console.warn("slider container id is missing. Execution can not continue");
       }
       var sliderItemSelector = "#"+targetDOMId+ " .recs-slider__item";
       var sliderItem = document.querySelector(sliderItemSelector);
       if(!sliderItem){
           return console.warn("slider item tile class is missing. Execution can not continue");
       }


       var recsSlider = document.querySelector("#recs-slider");

       var initialSteps = 30;

       var itemsToScroll = window.recsItemToScroll;

       var eventualSteps = initialSteps + itemsToScroll*5;
       var tileWidth = sliderItem.offsetWidth * itemsToScroll;
       var tileVal = tileWidth - (tileWidth % 30);
       var distance = tileWidth + (10*itemsToScroll);
       var slideTimer = setInterval(function () {
           if (direction == 'left') {
               var distToScroll = itemsToScroll*(scrollAmount + eventualSteps);
               if(distToScroll > distance){
                eventualSteps = distance - tileVal;
               }
            element.scrollLeft -= eventualSteps;
           } else {
               var distToScroll = scrollAmount + eventualSteps;
               if(distToScroll > distance){
                eventualSteps = distance - tileVal;         
               }
               element.scrollLeft += eventualSteps;
           }
           scrollAmount += eventualSteps;
           if (scrollAmount >= distance) {
               window.clearInterval(slideTimer);
           }

           if(element.scrollLeft === 0){
                // we have reached the starting position for scroll
                // thus we need to disable the prev button for slider
                var prevButton = document.querySelector(".rex-slider--prev");
                if(!prevButton){
                    return console.warn("rex-slider--prev class missing");
                }
                prevButton.disabled = true;
 
            }

            if((element.scrollLeft + element.offsetWidth) === recsSlider.offsetWidth){
                // we have reached the end position for scroll
                // thus we need to disable the next button for slider
                var nextButton = document.querySelector(".rex-slider--next");
                if(!nextButton){
                    return console.warn("rex-slider--next class missing");
                }
                nextButton.disabled = true;
            }
       }, speed);
   },
   
   // horizontal slider next button
   recsSliderScrollNext: function recsSliderScrollNext(event) {
       // a bit clumsy. But the only way to reach out to the id of the container
       var targetEl;
       try{    
          targetEl = event.currentTarget.parentElement.parentElement.parentElement;
       }
       catch(err){
           console.warn(err);
       }
       if(!targetEl){
           console.warn("target element not found. HTML was changed");
           return;
       }
       var targetElId = targetEl.id;
       var prevButtonSelector = "#"+targetElId+ " .rex-slider--prev";
       var prevButton = document.querySelector(prevButtonSelector);
       if(!prevButton){
           return console.warn("rex-slider--prev class missing");
       }
       if(prevButton.disabled){
           prevButton.disabled = false;
       }
       recsSliderSideScroll(targetElId,'right', 25, 30);
   },

   // horizontal slider prev button
   recsSliderScrollPrev: function recsSliderScrollPrev() {
        var targetEl;
        try{
            targetEl = event.currentTarget.parentElement.parentElement.parentElement;
        }
        catch(err){
            console.warn(err);
        }
        if(!targetEl){
            console.warn("target element not found. HTML was changed");
            return;
        }
        var targetElId = targetEl.id;
        var nextButtonSelector = "#"+targetElId+ " .rex-slider--next";
        var nextButton = document.querySelector(nextButtonSelector);
        if(!nextButton){
          return console.warn("rex-slider--next class missing");
        }
        if(nextButton.disabled){
          nextButton.disabled = false;
        }
        recsSliderSideScroll(targetElId,'left', 25, 30);
   }    
}

export var sendWarning = function (msg) {
    return console.warn(msg);
}
