export var eventHandlers = {
    // side scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    recsSliderSideScroll: function recsSliderSideScroll(targetDOMId, direction) {
        var scrollAmount = 0;

        // the target selector
        var elementSelector = "#" + targetDOMId + " #recs-slider-container";
        // the element which is going to be scrolled programmatically
        var element = document.querySelector(elementSelector);
        if (!element) {
            return console.warn("slider container id is missing. Execution can not continue");
        }
        var sliderItemSelector = "#" + targetDOMId + " .recs-slider__item";
        var sliderItem = document.querySelector(sliderItemSelector);
        if (!sliderItem) {
            return console.warn("slider item tile class is missing. Execution can not continue");
        }


        var recsSlider = document.querySelector("#recs-slider");

        // hard coding no of steps scrolled in given time frame to produce smooth effect
        var initialSteps = 30;

        // hard coding speed along with steps for smooth transition
        var speed = 25;

        // taking the no of items to be scrolled from window
        var itemsToScroll = window.recsItemToScrollHz;

        // an offset flag that is used around scroll limit and smoothness
        var eventualSteps = initialSteps + itemsToScroll * 5;

        // the entire width of the slider visible at once exclusive of margin
        var tileSliderWidth = sliderItem.clientWidth * itemsToScroll;

        // this value has to be deducted from the scrolled amount if the user
        // programatically scrolled beyond it
        var tileVal = tileSliderWidth - (tileSliderWidth % initialSteps);


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
                var prevButton = document.querySelector(".rex-slider--prev");
                if (!prevButton) {
                    return console.warn("rex-slider--prev class missing");
                }
                prevButton.disabled = true;

            }

            if ((element.scrollLeft + element.clientWidth) === recsSlider.clientWidth) {
                // we have reached the end position for scroll
                // thus we need to disable the next button for slider
                var nextButton = document.querySelector(".rex-slider--next");
                if (!nextButton) {
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
        var prevButtonSelector = "#" + targetElId + " .rex-slider--prev";
        var prevButton = document.querySelector(prevButtonSelector);
        if (!prevButton) {
            return console.warn("rex-slider--prev class missing");
        }
        if (prevButton.disabled) {
            prevButton.disabled = false;
        }
        recsSliderSideScroll(targetElId, 'right');
    },

    // horizontal slider prev button
    recsSliderScrollPrev: function recsSliderScrollPrev() {
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
        var nextButtonSelector = "#" + targetElId + " .rex-slider--next";
        var nextButton = document.querySelector(nextButtonSelector);
        if (!nextButton) {
            return console.warn("rex-slider--next class missing");
        }
        if (nextButton.disabled) {
            nextButton.disabled = false;
        }
        recsSliderSideScroll(targetElId, 'left');
    },

    // vertical scroll function with delayed scroll to provide smooth scroll
    // feature across cross browsers
    // the code inside the methods are in native javascript
    // because they are to be appended directly in the DOM
    recsSliderVerticalScroll: function recsSliderVerticalScroll(targetDOMId, direction) {
        var scrollAmount = 0;

        // the target selector
        var elementSelector = "#" + targetDOMId + " #recs-vertical-slider";
        // the element which is going to be scrolled programmatically
        var element = document.querySelector(elementSelector);
        if (!element) {
            return console.warn("slider container id is missing. Execution can not continue");
        }
        var sliderItemSelector = "#" + targetDOMId + " .recs-vertical-slider__item";
        var sliderItem = document.querySelector(sliderItemSelector);
        if (!sliderItem) {
            return console.warn("vertical slider item tile class is missing. Execution can not continue");
        }


        var recsSlider = document.querySelector("#recs-vertical-slider");

        // hard coding no of steps scrolled in given time frame to produce smooth effect
        var initialSteps = 50;

        // hard coding speed along with steps for smooth transition
        var speed = 40;

        // taking the no of items to be scrolled from window
        var itemsToScroll = window.recsItemToScrollVt;

        // an offset flag that is used around scroll limit and smoothness
        var eventualSteps = initialSteps + itemsToScroll * 5;

        // the entire height of the slider visible at once exclusive of margin
        var tileSliderHeight = sliderItem.clientHeight * itemsToScroll;

        // this value has to be deducted from the scrolled amount if the user
        // programatically scrolled beyond it
        var tileVal = tileSliderHeight - (tileSliderHeight % initialSteps);


        // the total distance to scroll inclusive of margin. 10 is the constant margin
        var distance = tileSliderHeight + (10 * itemsToScroll);

        var slideTimer = setInterval(function () {
            if (direction == 'top') {
                var distToScroll = scrollAmount + eventualSteps;
                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollTop -= eventualSteps;
            } else {
                var distToScroll = scrollAmount + eventualSteps;

                if (distToScroll > distance) {
                    eventualSteps -= (distToScroll - distance);
                }
                element.scrollTop += eventualSteps;
            }
            scrollAmount += eventualSteps;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }

            if (element.scrollTop === 0) {
                // we have reached the starting position for scroll
                // thus we need to disable the prev button for slider
                var prevButton = document.querySelector(".rex-vertical-slider--top");
                if (!prevButton) {
                    return console.warn("rex-vertical-slider--top class missing");
                }
                prevButton.disabled = true;

            }

            if ((element.clientHeight + element.scrollTop) >= element.scrollHeight) {
                // we have reached the end position for scroll
                // thus we need to disable the next button for slider
                var nextButton = document.querySelector(".rex-vertical-slider--bottom");
                if (!nextButton) {
                    return console.warn("rex-vertical-slider--bottom class missing");
                }
                nextButton.disabled = true;
            }
        }, speed);
    },

    recsSliderScrollBottom: function () {
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
        var topButtonSelector = "#" + targetElId + " .rex-vertical-slider--top";
        var topButton = document.querySelector(topButtonSelector);
        if (!topButton) {
            return console.warn("rex-vertical-slider--top class missing");
        }
        if (topButton.disabled) {
            topButton.disabled = false;
        }
        recsSliderVerticalScroll(targetElId, 'bottom');
    },

    recsSliderScrollTop: function () {
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
        var bottomButtonSelector = "#" + targetElId + " .rex-vertical-slider--bottom";
        var bottomButtom = document.querySelector(bottomButtonSelector);
        if (!bottomButtom) {
            return console.warn("rex-vertical-slider--bottom class missing");
        }
        console.log(bottomButtom)
        if (bottomButtom.disabled) {
            bottomButtom.disabled = false;
        }
        recsSliderVerticalScroll(targetElId, 'top');
    }
}



export var sendWarning = function (msg) {
    return console.warn(msg);
}
