export var eventHandlers = {
    // side scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    _unbxd_recsSliderSideScroll: function(targetDOMId, direction) {
        var scrollAmount = 0;

        // the target selector
        var elementSelector = "#" + targetDOMId + " #_unbxd_recs-slider-container";
        // the element which is going to be scrolled programmatically
        var element = document.querySelector(elementSelector);
        if (!element) {
            return console.warn("slider container id is missing. Execution can not continue");
        }
        var sliderItemSelector = "#" + targetDOMId + " ._unbxd_recs-slider__item";
        var sliderItem = document.querySelector(sliderItemSelector);
        if (!sliderItem) {
            return console.warn("slider item tile class is missing. Execution can not continue");
        }


        var recsSlider = document.querySelector("#_unbxd_recs-slider");

        // hard coding no of steps scrolled in given time frame to produce smooth effect
        var initialSteps = 30;

        // hard coding speed along with steps for smooth transition
        var speed = 25;

        // taking the no of items to be scrolled from window
        var itemsToScroll = window._unbxd_recsItemToScrollHz;

        // an offset flag that is used around scroll limit and smoothness
        var eventualSteps = initialSteps + itemsToScroll * 5;

        // the entire width of the slider visible at once exclusive of margin
        var tileSliderWidth = sliderItem.clientWidth * itemsToScroll;


        // the total distance to scroll inclusive of margin. 10 is the constant margin
        var distance = tileSliderWidth + (10 * itemsToScroll);

        var slideTimer = setInterval(function () {
            if (direction == 'left') {
                var distToScroll = scrollAmount + eventualSteps;
                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollLeft -= eventualSteps;
            } else {
                var distToScroll = scrollAmount + eventualSteps;
                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollLeft += eventualSteps;
            }
            scrollAmount += eventualSteps;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }

            if (element.scrollLeft === 0) {
                // we have reached the starting position for scroll
                // thus we need to disable the prev button for slider
                var prevButton = document.querySelector(elementSelector +" ._unbxd_rex-slider--prev");
                if (!prevButton) {
                    return console.warn("_unbxd_rex-slider--prev class missing");
                }
                prevButton.disabled = true;

            }

            if ((element.scrollLeft + element.clientWidth) === recsSlider.clientWidth) {
                // we have reached the end position for scroll
                // thus we need to disable the next button for slider
                var nextButton = document.querySelector(elementSelector + " ._unbxd_rex-slider--next");
                if (!nextButton) {
                    return console.warn("_unbxd_rex-slider--next class missing");
                }
                nextButton.disabled = true;
            }
        }, speed);
    },

    // horizontal slider next button
    _unbxd_recsSliderScrollNext: function(event) {
        // a bit clumsy. But the only way to reach out to the id of the container
        var targetEl;
        try {
            targetEl = event.currentTarget.parentElement.parentElement.parentElement;
        }
        catch (err) {
            console.warn(err);
        }
        if (!targetEl) {
            console.warn("target element not found. HTML was changed");
            return;
        }
        var targetElId = targetEl.id;
        var prevButtonSelector = "#" + targetElId + " ._unbxd_rex-slider--prev";
        var prevButton = document.querySelector(prevButtonSelector);
        if (!prevButton) {
            return console.warn("_unbxd_rex-slider--prev class missing");
        }
        if (prevButton.disabled) {
            prevButton.disabled = false;
        }
        _unbxd_recsSliderSideScroll(targetElId, 'right');
    },

    // horizontal slider prev button
    _unbxd_recsSliderScrollPrev: function() {
        var targetEl;
        try {
            targetEl = event.currentTarget.parentElement.parentElement.parentElement;
        }
        catch (err) {
            console.warn(err);
        }
        if (!targetEl) {
            console.warn("target element not found. HTML was changed");
            return;
        }
        var targetElId = targetEl.id;
        var nextButtonSelector = "#" + targetElId + " ._unbxd_rex-slider--next";
        var nextButton = document.querySelector(nextButtonSelector);
        if (!nextButton) {
            return console.warn("_unbxd_rex-slider--next class missing");
        }
        if (nextButton.disabled) {
            nextButton.disabled = false;
        }
        _unbxd_recsSliderSideScroll(targetElId, 'left');
    },

    // vertical scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    _unbxd_recsSliderVerticalScroll: function(targetDOMId, direction) {
        var scrollAmount = 0;

        // the target selector
        var elementSelector = "#" + targetDOMId + " #_unbxd_recs-vertical-slider-container";
        // the element which is going to be scrolled programmatically
        var element = document.querySelector(elementSelector);
        if (!element) {
            return console.warn("slider container id is missing. Execution can not continue");
        }
        var sliderItemSelector = "#" + targetDOMId + " ._unbxd_recs-vertical-slider__item";
        var sliderItem = document.querySelector(sliderItemSelector);
        if (!sliderItem) {
            return console.warn("vertical slider item tile class is missing. Execution can not continue");
        }


        // hard coding no of steps scrolled in given time frame to produce smooth effect
        var initialSteps = 50;

        // hard coding speed along with steps for smooth transition
        var speed = 40;

        // taking the no of items to be scrolled from window
        var itemsToScroll = 1 //window.recsItemToScrollVt;

        // an offset flag that is used around scroll limit and smoothness
        var eventualSteps = initialSteps + itemsToScroll * 5;

        // the entire width of the slider visible at once exclusive of margin
        var tileSliderWidth = (sliderItem.clientWidth + 20) * itemsToScroll;

        // the total distance to scroll inclusive of margin. 10 is the constant margin
        var distance = tileSliderWidth;

        var slideTimer = setInterval(function () {
            if (direction == 'top') {
                var distToScroll = scrollAmount + eventualSteps;
                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollLeft -= eventualSteps;
            } else {
                var distToScroll = scrollAmount + eventualSteps;

                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollLeft += eventualSteps;
            }
            scrollAmount += eventualSteps;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }

            if (element.scrollLeft === 0) {
                // we have reached the starting position for scroll
                // thus we need to disable the prev button for slider
                var prevButton = document.querySelector("#"+targetDOMId+" ._unbxd_rex-vertical-slider--top");
                if (!prevButton) {
                    return console.warn("#"+targetDOMId+" _unbxd_rex-vertical-slider--top class missing");
                }
                prevButton.disabled = true;

            }

            if ((element.clientWidth + element.scrollLeft) >= element.scrollWidth) {
                // we have reached the end position for scroll
                // thus we need to disable the next button for slider
                var nextButton = document.querySelector("#"+targetDOMId+ " ._unbxd_rex-vertical-slider--bottom");
                if (!nextButton) {
                    return console.warn("#"+targetDOMId+ " _unbxd_rex-vertical-slider--bottom class missing");
                }
                nextButton.disabled = true;
            }
        }, speed);
    },

    _unbxd_recsSliderScrollBottom: function() {
        var targetEl;
        try {
            targetEl = event.currentTarget.parentElement.parentElement.parentElement;
        }
        catch (err) {
            console.warn(err);
        }
        if (!targetEl) {
            console.warn("target element not found. HTML was changed");
            return;
        }
        var targetElId = targetEl.id;
        var topButtonSelector = "#" + targetElId + " ._unbxd_rex-vertical-slider--top";
        var topButton = document.querySelector(topButtonSelector);
        if (!topButton) {
            return console.warn("_unbxd_rex-vertical-slider--top class missing");
        }
        if (topButton.disabled) {
            topButton.disabled = false;
        }
        _unbxd_recsSliderVerticalScroll(targetElId, 'bottom');
    },

    _unbxd_recsSliderScrollTop: function () {
        var targetEl;
        try {
            targetEl = event.currentTarget.parentElement.parentElement.parentElement;
        }
        catch (err) {
            console.warn(err);
        }
        if (!targetEl) {
            console.warn("target element not found. HTML was changed");
            return;
        }
        var targetElId = targetEl.id;
        var bottomButtonSelector = "#" + targetElId + " ._unbxd_rex-vertical-slider--bottom";
        var bottomButtom = document.querySelector(bottomButtonSelector);
        if (!bottomButtom) {
            return console.warn("_unbxd_rex-vertical-slider--bottom class missing");
        }
        if (bottomButtom.disabled) {
            bottomButtom.disabled = false;
        }
        _unbxd_recsSliderVerticalScroll(targetElId, 'top');
    }
}



export var sendWarning = function (msg) {
    return console.warn(msg);
}
