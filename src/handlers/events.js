export var eventHandlers = {
    // side scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    recsSliderSideScroll: function recsSliderSideScroll(direction, speed, step) {
       scrollAmount = 0;
       var element = document.querySelector("#recs-slider-container");
       if(!element){
           return console.warn("slider container id is missing. Execution can not continue");
       }
       var sliderItem = document.querySelector(".recs-slider__item");
       if(!sliderItem){
           return console.warn("slider item tile class is missing. Execution can not continue");
       }


       var recsSlider = document.querySelector("#recs-slider");

      
       var tileWidth = sliderItem.offsetWidth;
       var tileVal = tileWidth - (tileWidth % 30);
       var distance = tileWidth + 10;
       var slideTimer = setInterval(function () {
           if (direction == 'left') {
               var distToScroll = scrollAmount + step;
               if(distToScroll > distance){
                  step = distance - tileVal;
               }
            element.scrollLeft -= step;
           } else {
               var distToScroll = scrollAmount + step;
               if(distToScroll > distance){
                  step = distance - tileVal;         
               }
               element.scrollLeft += step;
           }
           scrollAmount += step;
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
   recsSliderScrollNext: function recsSliderScrollNext() {
       var prevButton = document.querySelector(".rex-slider--prev");
       if(!prevButton){
           return console.warn("rex-slider--prev class missing");
       }
       if(prevButton.disabled){
           prevButton.disabled = false;
       }
       recsSliderSideScroll('right', 25, 30);
   },

   // horizontal slider prev button
   recsSliderScrollPrev: function recsSliderScrollPrev() {
       var nextButton = document.querySelector(".rex-slider--next");
       if(!nextButton){
         return console.warn("rex-slider--next class missing");
       }
       if(nextButton.disabled){
         nextButton.disabled = false;
       }
       recsSliderSideScroll('left', 25, 30);
   }    
}

export var sendWarning = function (msg) {
    return console.warn(msg);
}
