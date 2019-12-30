import './dot';
import { eventHandlers, setImagesSource, sendWarning } from './handlers';
import { style, vStyles } from './config';
import { getRatings } from './ratings';

(function (global) {

    /**
     * Global declaration section
     */

    /** Function for fetching api requests */
    function fetchData(url, cb) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
                // Typical action to be performed when the document is ready:
                cb(null, xhttp.responseText);
            }
            else if (this.readyState == 4 && (this.status != 200 || this.status != 204)) {
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

    // Vertical template config containers
    var verticalConfig;
    var verticalAssets;
    // Setting constant values for margin between slider items and the DOM id for the slider
    var margin = 10;
    /** End of Global variables */

    /**
     * End of Global declaration section
     */

    /** Scripts and styles that are appended to the DOM */

    /** Adding event handlers for the horizontal slider to the DOM */


    global.recsSliderScrollNext = eventHandlers.recsSliderScrollNext;
    global.recsSliderScrollPrev = eventHandlers.recsSliderScrollPrev;
    global.recsSliderSideScroll = eventHandlers.recsSliderSideScroll;

    global.recsSliderScrollBottom = eventHandlers.recsSliderScrollBottom;
    global.recsSliderScrollTop = eventHandlers.recsSliderScrollTop;
    global.recsSliderVerticalScroll = eventHandlers.recsSliderVerticalScroll;


    /** Attaching styles for the slider */
    var eventHandlerStyle = document.createElement('style');
    eventHandlerStyle.type = 'text/css';
    // innerHTML needs to stay as es5 since it will be embedded duirectly to client's browser
    eventHandlerStyle.innerHTML = style;
    document.head.appendChild(eventHandlerStyle);

    /** End of Scripts and styles that are appended to the DOM */


    // Configuration object for vertical/horizontal sliders
    var sliderConfig = {
        horizontal: {
            containerId: " #recs-slider-container",
            sliderItemClassSelector: " .recs-slider__item",
            dimension: "width",
            offsetDimension: "offsetWidth",
            buttonClassSelector: ".recs-slider-btn",
            prevButtonClass: "rex-slider--prev",
            nextButtonClass: "rex-slider--next",
            headingContainerId: " #recs-slider-heading",
            sliderContentClass: "recs-slider__content"
        },
        vertical: {
            containerId: " #recs-vertical-slider-container",
            sliderItemClassSelector: " .recs-vertical-slider__item",
            dimension: "height",
            offsetDimension: "offsetHeight",
            buttonClassSelector: ".recs-vertical-slider-btn",
            prevButtonClass: "rex-vertical-slider--top",
            nextButtonClass: "rex-vertical-slider--bottom",
            headingContainerId: " #recs-vertical-slider-heading",
            sliderContentClass: "recs-vertical-slider__content"
        }
    }

    function handleSizeCalculations(targetDOMElementId, options) {
        var config = options.config;
        var recommendations = options.recommendations;
        var clickHandler = options.clickHandler;
        var itemsToShow = options.itemsToShow;
        var maxProducts = options.maxProducts;
        var assets = options.assets;
        var sliderType = options.sliderType;
        var sliderClass = options.sliderClass;
        var sliderContent = sliderConfig[sliderType]
        var domSelector = "#" + targetDOMElementId + sliderContent.containerId;
        var sliderContainer = document.querySelector(domSelector);
        if (!sliderContainer) {
            return sendWarning('The slider container id was not found. Script can not continue');
        }

        var sliderItemSelector = "#" + targetDOMElementId + sliderContent.sliderItemClassSelector;
        var sliderItems = document.querySelectorAll(sliderItemSelector);

        if (!sliderItems.length) {
            return sendWarning('Found 0 nodes with class : ' + sliderContent.sliderItemClassSelector);
        }

        var productFields = config.products.fields;

        var dimension = sliderContent.dimension;

        for (var i = 0; i < sliderItems.length; i++) {

            // adding click handler to each item
            if (clickHandler) {
                (function (index) {
                    sliderItems[i].addEventListener("click", function () {
                        clickHandler(recommendations[index]);
                    });
                })(i);
            }

            for (var j = 0; j < productFields.length; j++) {
                var dimensionKey = productFields[j].unbxd_dimension_key;
                // appending fields to slider item
                // field appending doesn't applies to imageUrl
                if (dimensionKey != "imageUrl") {
                    var newnode = document.createElement("p");
                    newnode.className = sliderContent.sliderContentClass;
                    if (dimensionKey == "rating") {
                        newnode.className = sliderContent.sliderContentClass + " content--ratings";
                        newnode.innerHTML = getRatings(recommendations[i][dimensionKey]);
                    }
                    else {
                        newnode.innerHTML = recommendations[i][dimensionKey];
                    }

                    sliderItems[i].appendChild(newnode);
                }
            }

        }

        // Setting width of each slider item and
        // setting width of the visible slider
        var recsSliderSelector = "#" + targetDOMElementId + " ." + sliderClass;
        var recsSlider = document.querySelector(recsSliderSelector);
        if (!recsSlider) {
            return sendWarning('Slider Parent id was not found in the DOM');
        }

        if (sliderContent.dimension == "width") {

            setTimeout(function () {
                sliderContainer.style.width = sliderContainer[sliderContent.offsetDimension];

                var hzSliderWidth = (sliderContainer[sliderContent.offsetDimension] - (itemsToShow * margin)) / itemsToShow;

                for (i = 0; i < sliderItems.length; i++) {
                    sliderItems[i].style.width = hzSliderWidth;
                }
                recsSlider.style[sliderContent.dimension] = (maxProducts * hzSliderWidth) + (maxProducts) * margin + 'px';

            }, 0);
        }
        else{
            setTimeout(function(){
                var sliderItemHeight = sliderItems[0].getBoundingClientRect().height;
                recsSlider.style[sliderContent.dimension] = (sliderItemHeight * itemsToShow) + (itemsToShow * margin) + margin;
            }, 0);
        }



        /** Setting styles for carousel buttons */
        // the navigation button need to be hidden in case the total no of items to be shown
        // are less than the no of items to be shown at in one slide 
        if (recommendations.length <= itemsToShow) {
            var navigationButtonSelector = "#" + targetDOMElementId + " " + sliderContent.buttonClassSelector;
            var navigationButtons = document.querySelectorAll(navigationButtonSelector);
            if (!navigationButtons || !navigationButtons.length) {
                return sendWarning(sliderContent.buttonClassSelector + 'class not found on navigation buttons');
            }
            for (var i = 0; i < navigationButtons.length; i++) {
                navigationButtons[i].style.display = 'none';
            }
        }

        // the previous button for the slider needs to be disabled initially
        var prevSliderButtonSelector = "#" + targetDOMElementId + " ." + sliderContent.prevButtonClass;
        var prevSliderButton = document.querySelector(prevSliderButtonSelector);

        if (!prevSliderButton) {
            return sendWarning(sliderContent.prevButtonClass + ' class was not found on the navigation buttons');
        }
        prevSliderButton.disabled = true;

        /** Setting images value */
        var imgArr = [];
        var classMap = {
            "next_arrow": sliderContent.nextButtonClass,
            "prev_arrow": sliderContent.prevButtonClass,
            "empty_rating": "rex-empty-star",
            "half_rating": "rex-half-star",
            "full_rating": "rex-full-star"
        }
        for (i = 0; i < assets.length; i++) {
            var horizontalAssetItem = assets[i];
            imgArr.push(
                {
                    classname: classMap[horizontalAssetItem.tag],
                    url: horizontalAssetItem.src
                }
            );
        }
        setImagesSource(imgArr, targetDOMElementId);

        /** Setting images value end*/

        /** Setting styles for heading */

        var headingSelector = "#" + targetDOMElementId + sliderContent.headingContainerId;
        var styleConfig = config.header;
        var headingEl = document.querySelector(headingSelector);
        headingEl.style.textAlign = styleConfig.alignment;
        headingEl.style.fontSize = styleConfig.text.size.value + styleConfig.text.size.unit;
        headingEl.style.fontWeight = styleConfig.text.style;
        headingEl.style.color = styleConfig.text.colour;

        /** End of Setting styles for heading */

    }

    /** exporting a global function to initialize recs slider */
    global.recsSliderInit = function (options) {
        /** Template rendering logic */
        var template = options.template;
        var targetDOMElementId = options.targetDOMElementId;
        var recommendations = options.recommendations;
        var heading = options.heading;
        var config = options.config;
        var itemsToShow = config.products.visible_products;
        var maxProducts = config.products.max_products;
        var clickHandler = options.clickHandler;
        var isVertical = options.isVertical;


        var renderFn = doT.template(template);
        var renderTargetEl = document.getElementById(targetDOMElementId);

        if (!renderTargetEl) {
            return sendWarning('The target element id <' + targetDOMElementId + '> is not present in DOM. Execution can not continue');
        }

        document.getElementById(targetDOMElementId).innerHTML = renderFn({
            recommendations: recommendations,
            heading: heading, getRatings: getRatings
        });

        /** Dynamically adjusting width based on no of items to be shown */

        var sliderOptionsConfig = {
            config: config,
            recommendations: recommendations,
            clickHandler: clickHandler,
            itemsToShow: itemsToShow,
            maxProducts: maxProducts,
            assets: options.assets,
            sliderType: isVertical ? "vertical" : "horizontal",
            sliderClass: isVertical ?  "recs-vertical-slider":  "recs-slider"
        }

          // no of items to be shown
          if(isVertical){
            global.recsItemToScrollHz = itemsToShow;
          }
          else{
            global.recsItemToScrollVt = itemsToShow;
          }
          

        handleSizeCalculations(targetDOMElementId, sliderOptionsConfig);
    }


    /** The initialization function that has to be exposed to the merchandizer website
        *  it takes context object from the client html
        *  and makes a call to the recommender proxy
        *  and updates the dom as per the response
        */
    global.unbxdTemplateInit = function (context) {
        var widgets = context.widgets;

        if (!widgets) {
            throw new Error("Widgets information is missing");
        }

        // retrieve ids for widget containers
        widget1 = widgets.widget1;
        widget2 = widgets.widget2;
        widget3 = widgets.widget3;

        if (!widget1 && !widget2 && !widget3) {
            throw new Error('No widget id provided');
        }

        // getting userId, siteKey and apiKey
        var userInfo = context.userInfo;
        if (!userInfo) {
            throw new Error("User info missing")
        }

        var userId = userInfo.userId;
        var siteKey = userInfo.siteKey;
        var apiKey = userInfo.apiKey;

        var requestUrl = platformDomain + apiKey + "/" + siteKey + '/items?pageType=';

        if (!userId) {
            throw new Error("user id is missing");
        }

        if (!siteKey) {
            throw new Error("site Key is missing");
        }

        if (!apiKey) {
            throw new Error("api key is missing");
        }


        // getting page info

        var pageInfo = context.pageInfo;

        if (!pageInfo) {
            throw new Error("Page info missing")
        }

        var pageType = pageInfo.pageType;
        // check if the value for page type is valid
        var allowedPageTypes = ["HOME", "CATEGORY", "PRODUCT", "CART", "BRAND"];
        if (allowedPageTypes.indexOf(pageType) == -1) {
            throw error("Invalid value for page type");
        }


        requestUrl += pageType
        switch (pageType) {
            case "PRODUCT":
            case "CART":
                var productId = pageInfo.productId;
                if (!productId) {
                    throw new Error("product id is missing for page type:" + pageType);
                }
                requestUrl += "&id=" + productId;
                break;
            case "CATEGORY":
                var catlevel1Name = pageInfo.catlevel1Name;
                if (!catlevel1Name) {
                    throw new Error("catlevel1Name is mandatory for page type:" + pageType);
                }
                var catlevel2Name = pageInfo.catlevel2Name;
                var catlevel3Name = pageInfo.catlevel3Name;
                var catlevel4Name = pageInfo.catlevel4Name;
                var categoryUrl = "&catlevel1Name=" + catlevel1Name;
                categoryUrl += catlevel2Name ? ("&catlevel2Name=" + catlevel2Name) : "";
                categoryUrl += catlevel3Name ? ("&catlevel3Name=" + catlevel3Name) : "";
                categoryUrl += catlevel4Name ? ("&catlevel4Name=" + catlevel4Name) : "";
                requestUrl += categoryUrl;
                break;
            case "BRAND":
                var brand = pageInfo.brand;
                if (!brand) {
                    throw new Error("brand is mandatory for page type:" + pageType);
                }
                requestUrl += "&brand=" + brand;
                break;
        }

        requestUrl += "&uid=" + userId;


        function renderWidgetDataHorizontal(widget, recommendations, heading) {
            var maxProducts = horizontalConfig.products.max_products;
            var targetDOMElementId = widget.name;
            var clickHandler = widget.clickHandler;
            recommendations = recommendations.splice(0, maxProducts);
            var options = {
                template: horizontalTemplate,
                targetDOMElementId: targetDOMElementId,
                recommendations: recommendations,
                heading: heading,
                config: horizontalConfig,
                assets: horizontalAssets,
                maxProducts: maxProducts,
                clickHandler: clickHandler,
                sliderClass: "recs-slider"
            }
            recsSliderInit(options);
        }


        function renderWidgetDataVertical(widget, recommendations, heading) {
            var maxProducts = verticalConfig.products.max_products;
            var targetDOMElementId = widget.name;
            var clickHandler = widget.clickHandler;
            recommendations = recommendations.splice(0, maxProducts);
            var options = {
                template: verticalTemplate,
                targetDOMElementId: targetDOMElementId,
                recommendations: recommendations,
                heading: heading,
                config: verticalConfig,
                assets: verticalAssets,
                maxProducts: maxProducts,
                clickHandler: clickHandler,
                isVertical: true,
                sliderClass: "recs-vertical-slider"

            }
            recsSliderInit(options);
        }

        function handleWidgetRenderingVertical() {
            if (widget3) {
                var widget3Data = recommendationsResponse.rex_data.widget3;
                var widget3Heading = widget3Data.title;
                var widget3Recommendations = widget3Data.recommendations;
                /** Attaching styles for the slider */
                var eventHandlerStyle = document.createElement('style');
                eventHandlerStyle.type = 'text/css';
                // innerHTML needs to stay as es5 since it will be embedded duirectly to client's browser
                eventHandlerStyle.innerHTML = vStyles;
                document.head.appendChild(eventHandlerStyle);
                renderWidgetDataVertical(widget3, widget3Recommendations, widget3Heading);
            }
        }

        function handleWidgetRendering() {
            if (widget1) {
                var widget1Data = recommendationsResponse.rex_data.widget1;
                var widget1Heading = widget1Data.title;
                var widget1Recommendations = widget1Data.recommendations;
                renderWidgetDataHorizontal(widget1, widget1Recommendations, widget1Heading);
            }
            if (widget2) {
                var widget2Data = recommendationsResponse.rex_data.widget2;
                var widget2Heading = widget2Data.title;
                var widget2Recommendations = widget2Data.recommendations;
                renderWidgetDataHorizontal(widget2, widget2Recommendations, widget2Heading);
            }

        }

        function horizontalTemplateHandler(err, res) {
            if (err) {
                throw new Error('Failed to fetch templates');
            }
            // populating the template string
            horizontalTemplate = res;
            handleWidgetRendering();
        }

        function verticalTemplateHandler(err, res) {
            if (err) {
                throw new Error('Failed to fetch templates');
            }
            // populating the template string
            verticalTemplate = res;
            handleWidgetRenderingVertical();
        }

        /** Fetch recomendations response */
        // to store recommendations response
        var recommendationsResponse;
        // to store template string
        var horizontalTemplate;
        // to store vertical template string
        var verticalTemplate;
        fetchData(requestUrl, function (err, res) {
            // fetching data specific to a page type
            if (err) {
                throw new Error('Failed to fetch recommendations');
            }
            recommendationsResponse = JSON.parse(res);

            // horizontal templates configuration
            var horizontalTemplate = recommendationsResponse.horizontal;
            horizontalConfig = horizontalTemplate.configuration;
            horizontalAssets = horizontalTemplate.assets;
            var templateUrlHorizontal = horizontalTemplate.layout.src;

            /** Fetch template layout string */
            fetchData(templateUrlHorizontal, horizontalTemplateHandler);


            // vertical templates configuration
            var verticalTemplate = recommendationsResponse.vertical;
            verticalConfig = verticalTemplate.configuration;
            verticalAssets = verticalTemplate.assets;
            var templateUrlVertical = verticalTemplate.layout.src;

            /** Fetch vertical template layout string */
            fetchData(templateUrlVertical, verticalTemplateHandler);

        });

    }
})(window);


