import './dot';
import { eventHandlers, setImagesSource, sendWarning } from './handlers';
import { compressedStyle } from './config';
import { getRatings } from './ratings';

(function (global) {

    /**
     * Global declaration section
     */

    /** Function for fetching api requests */
    function fetchData(url, cb) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
                // Typical action to be performed when the document is ready:
                cb(null, xhttp.responseText);
            }
            else if (this.readyState == 4 && (this.status != 200 || this.status != 204)) {
                cb('Invalid network request: ' + url);
            }
        };
        xhttp.onerror = function() {
            cb('Failed network request: ' + url);
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }


    /** Global variables */
    // the domain url
    var platformDomain = 'http://localhost:4201/';
    // var platformDomain = 'http://console-lohika.0126-int-use2.unbxd.io/v2.0/';

    // Constants
    var HOME_PAGE = 'home';
    var PRODUCT_PAGE = 'product';
    var CATEGORY_PAGE = 'category';
    var CART_PAGE = 'cart';
    var allowedPageTypes = [ HOME_PAGE, PRODUCT_PAGE, CATEGORY_PAGE, CART_PAGE ];

    var widgetIdMap = {};
    widgetIdMap[HOME_PAGE] = {
            'widget1': 'unbxd_rex_'+HOME_PAGE+'_w1',
            'widget2': 'unbxd_rex_'+HOME_PAGE+'_w2',
            'widget3': 'unbxd_rex_'+HOME_PAGE+'_w3'
    };
    widgetIdMap[PRODUCT_PAGE] = {
            'widget1': 'unbxd_rex_'+PRODUCT_PAGE+'_w1',
            'widget2': 'unbxd_rex_'+PRODUCT_PAGE+'_w2',
            'widget3': 'unbxd_rex_'+PRODUCT_PAGE+'_w3'
    };
    widgetIdMap[CATEGORY_PAGE] = {
            'widget1': 'unbxd_rex_'+CATEGORY_PAGE+'_w1',
            'widget2': 'unbxd_rex_'+CATEGORY_PAGE+'_w2',
            'widget3': 'unbxd_rex_'+CATEGORY_PAGE+'_w3'
    };
    widgetIdMap[CART_PAGE] = {
            'widget1': 'unbxd_rex_'+CART_PAGE+'_w1',
            'widget2': 'unbxd_rex_'+CART_PAGE+'_w2',
            'widget3': 'unbxd_rex_'+CART_PAGE+'_w3'
    }

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
    // innerHTML needs to stay as es5 since it will be embedded directly to client's browser
    // console.log('compressedStyle', compressedStyle)
    eventHandlerStyle.innerHTML = compressedStyle;
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

    function missingValueError(valueKey, contentObject) {
        throw new Error('Error: ' + valueKey + ' not found in ' + JSON.stringify(contentObject));
    }

    function handleSizeCalculations(targetDOMElementId, options) {
        var rexConsoleConfigs = options.rexConsoleConfigs;
        var recommendations = options.recommendations;
        var clickHandler = options.clickHandler;
        var itemsToShow = options.itemsToShow;
        var maxProducts = options.maxProducts;
        var assets = options.assets;
        var sliderType = options.sliderType;
        var sliderClass = options.sliderClass;
        var recommendationsModified = options.recommendationsModified;
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

        var productFields = rexConsoleConfigs.products.fields || missingValueError('products.fields', rexConsoleConfigs );

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

            var fragment = document.createDocumentFragment();

            for (var j = 0; j < productFields.length; j++) {
                // console.log(productFields[j])
                var dimensionKey = productFields[j].unbxdDimensionKey || missingValueError('unbxdDimensionKey', productFields[j]) ;
                // console.log(dimensionKey);
                // appending fields to slider item
                // field appending doesn't applies to imageUrl
                if (dimensionKey != "imageUrl") {
                    var newnode = document.createElement("p");
                    var dimension = recommendations[i][dimensionKey];
                    newnode.className = sliderContent.sliderContentClass;
                    if (dimensionKey == "rating") {
                        newnode.className = sliderContent.sliderContentClass + " content--ratings";
                        if (!dimension) {
                            newnode.innerHTML = "";
                        }
                        else {
                            newnode.innerHTML = getRatings(dimension);
                        }
                    }
                    else {
                        if (!dimension) {
                            newnode.innerHTML = "";
                        }
                        else {
                            newnode.innerHTML = dimension;
                        }
                    }
                    if (newnode.innerHTML) {
                        fragment.appendChild(newnode);
                    }
                }
            }

            sliderItems[i].appendChild(fragment);
        }

        // Setting width of each slider item and
        // setting width of the visible slider
        var recsSliderSelector = "#" + targetDOMElementId + " ." + sliderClass;
        var recsSlider = document.querySelector(recsSliderSelector);
        if (!recsSlider) {
            return sendWarning('Slider Parent id was not found in the DOM');
        }

        var maxprodLimit = maxProducts;
        if (recommendations.length < maxProducts) {
            maxprodLimit = recommendations.length
        }

        function incrementCounter() {
            counter++;
            if (counter === len) {
                // console.log('All images loaded!');
                if (sliderContent.dimension == "width") {

                    setTimeout(function () {
                        sliderContainer.style.width = sliderContainer[sliderContent.offsetDimension];
                        // console.log("sliderContainer.style.width",sliderContainer.style.width)
                        var hzSliderWidth = (sliderContainer[sliderContent.offsetDimension] - (itemsToShow * margin)) / itemsToShow;
                        for (i = 0; i < sliderItems.length; i++) {
                            sliderItems[i].style.width = hzSliderWidth + "px";
                            // console.log("itemWidth",sliderItems[i].style.width);
                            // console.log("maxProducts",maxprodLimit);
                            // console.log("hzSliderWidth",hzSliderWidth);
                            // console.log("margin",margin);
                            // console.log(maxprodLimit*(margin + hzSliderWidth))
                            recsSlider.style.width = (maxprodLimit * hzSliderWidth) + (maxprodLimit) * margin + "px";
                        }
                    }, 0);
                }
                else {
                    var targetDomElement = document.querySelector("#"+targetDOMElementId);
                    sliderContainer.style.width = (targetDomElement.clientWidth);
                    setTimeout(function(){     
                            for(i=0; i< sliderItems.length; i++){
                                sliderItems[i].style.width = targetDomElement.clientWidth - 2*margin +"px";
                            }
                    }, 0);
                    recsSlider.style.width = (targetDomElement.clientWidth) * recommendationsModified.length + "px";
                    // console.log("sliderItemHeight", sliderItemHeight);
                    // console.log("itemsToShow", itemsToShow);
                    // console.log("margin" + margin);
                    // console.log("sum", (sliderItemHeight * itemsToShow) + (itemsToShow * margin) + margin);
    
                    // recsSlider.style[sliderContent.dimension] = (sliderItemHeight * itemsToShow) + (itemsToShow * margin) + margin + "px";
                    // console.log("recsSliderHeight", recsSlider.style[sliderContent.dimension]);
                }
            }
        }

        var imgs = document.images,
        len = imgs.length,
        counter = 0;

        [].forEach.call(imgs, function (img) {
            if (img.complete)
                incrementCounter();
            else
                img.addEventListener('load', incrementCounter, false);
        });


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
        var styleConfig = rexConsoleConfigs.header;
        var headingEl = document.querySelector(headingSelector);
        if (headingEl.innerHTML == "null" || headingEl.innerHTML == "undefined") {
            headingEl.style.display = "none";
        }
        else {
            headingEl.style.textAlign = styleConfig.alignment;
            headingEl.style.fontSize = styleConfig.text.size.value + styleConfig.text.size.unit;
            headingEl.style.fontWeight = styleConfig.text.style;
            headingEl.style.color = styleConfig.text.colour;
        }

        /** End of Setting styles for heading */
    }

    /** exporting a global function to initialize recs slider */
    global._unbxd_generateRexContent = function (options) {
        /** Template rendering logic */
        var template = options.template || missingValueError('template', options);
        var targetDOMElementId = options.targetDOMElementId || missingValueError('targetDOMElementId', options);
        var recommendations = options.recommendations || missingValueError('recommendations', options) ;
        var heading = options.heading || missingValueError('heading', options);
        var rexConsoleConfigs = options.rexConsoleConfigs || missingValueError('rexConsoleConfigs', options);
        var itemsToShow = rexConsoleConfigs.products.visible || missingValueError('products.visible', rexConsoleConfigs);
        var maxProducts = rexConsoleConfigs.products.max || missingValueError('products.max', rexConsoleConfigs);
        var clickHandler = options.clickHandler;
        var isVertical = options.isVertical;
        var recommendationsModified = null;
        if(isVertical){
            recommendationsModified = [];
            for(var i=0;i<recommendations.length;i++){
                if(i %(itemsToShow) === 0){
                    var slicedItems = recommendations.slice(i, i+itemsToShow);
                    recommendationsModified.push(slicedItems);
                }
            }
        }
       
        var renderFn = doT.template(template);
        var renderTargetEl = document.getElementById(targetDOMElementId);

        if (!renderTargetEl) {
            return sendWarning('The target element id <' + targetDOMElementId + '> is not present in DOM. Execution can not continue');
        }

        if (maxProducts < recommendations.length) {
            // console.log("maxProducts",maxProducts);
            recommendations = recommendations.splice(0, maxProducts);
            // console.log("recommendations",recommendations);
        }

        document.getElementById(targetDOMElementId).innerHTML = renderFn({
            recommendations: recommendationsModified || recommendations,
            heading: heading, getRatings: getRatings
        });

        /** Dynamically adjusting width based on no of items to be shown */
        var sliderOptionsConfig = {
            rexConsoleConfigs: rexConsoleConfigs,
            recommendations: recommendations,
            recommendationsModified:recommendationsModified,
            clickHandler: clickHandler,
            itemsToShow: itemsToShow,
            maxProducts: maxProducts,
            assets: options.assets,
            sliderType: isVertical ? "vertical" : "horizontal",
            sliderClass: isVertical ? "recs-vertical-slider" : "recs-slider"
        }

        // no of items to be shown
        if (isVertical) {
            global.recsItemToScrollVt = itemsToShow;
        }
        else {
            global.recsItemToScrollHz = itemsToShow;
        }
        handleSizeCalculations(targetDOMElementId, sliderOptionsConfig);
    }


    /** The initialization function that has to be exposed to the merchandiser website
        *  it takes context object from the client html
        *  and makes a call to the recommender proxy
        *  and updates the dom as per the response
        */
    global._unbxd_getRecommendations = function (context) {

        // Get widget id
        function getWidgetId(pageType, widgetKey, widgetDetails) {
            console.log(pageType, widgetKey, widgetDetails)
            var widgetIdLocal;
            if (widgetDetails) {
                return widgetDetails[widgetKey] ? widgetDetails[widgetKey].name : null;
            } else {
                widgetIdLocal = widgetIdMap[pageType.toLowerCase()][widgetKey];
                // Check if widget exists in the page
                if(document.getElementById(widgetIdLocal)) {
                    return widgetIdLocal;
                } else {
                    return null;
                }
            }
            return null;
        }

        function getPageDetails(pageInfo) {
            if (!pageInfo || !pageInfo.pageType) {
                throw new Error("Page type info missing");
            }
            var pageTypeLocal = pageInfo.pageType;
            if (allowedPageTypes.indexOf(pageTypeLocal.toLowerCase()) == -1) {
                throw new Error("Invalid value for page type");
            }
            return pageTypeLocal;
        }

        function getClickHandler(context) {
            return context.itemClickHandler;
        }

        function getUrlEncodedParam(paramName, paramValue) {
            return "" + paramName + "=" + encodeURIComponent(paramValue);
        }

        function getProductIdsAsUrlParams(productIdsList) {
            var queryStringLocal = '';
            if (productIdsList instanceof Array) {
                productIdsList.forEach(function(item){
                    queryStringLocal+='&'+getUrlEncodedParam('id', item);
                });
            } else {
                queryStringLocal+='&'+getUrlEncodedParam('id', productIdsList);
            }
            return queryStringLocal;
        }

        // getting page info
        var pageType = getPageDetails(context.pageInfo);

        // get widget if
        var widgets = context.widgets;
        widget1 = getWidgetId(pageType, 'widget1', widgets);
        widget2 = getWidgetId(pageType, 'widget2', widgets);
        widget3 = getWidgetId(pageType, 'widget3', widgets);
        if (!widget1 && !widget2 && !widget3) {
            throw new Error('No widget id provided');
        }
        var itemClickHandler = getClickHandler(context);

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

        requestUrl += encodeURIComponent(pageType);
        var pageInfo = context.pageInfo;
        switch (pageType.toLowerCase()) {
            case PRODUCT_PAGE:
            case CART_PAGE:
                if (!pageInfo.productIds) {
                    throw new Error("product id is missing for page type:" + pageType);
                }
                requestUrl += getProductIdsAsUrlParams(pageInfo.productIds);
                break;
            case CATEGORY_PAGE:
                var catlevel1Name = pageInfo.catlevel1Name;
                if (!catlevel1Name) {
                    throw new Error("catlevel1Name is mandatory for page type:" + pageType);
                }
                var catlevel2Name = pageInfo.catlevel2Name;
                var catlevel3Name = pageInfo.catlevel3Name;
                var catlevel4Name = pageInfo.catlevel4Name;
                var categoryUrl = getUrlEncodedParam("catlevel1Name", catlevel1Name);
                if (catlevel2Name) {
                    categoryUrl += getUrlEncodedParam("catlevel2Name", catlevel2Name);
                    if (catlevel3Name) {
                        categoryUrl += getUrlEncodedParam("catlevel3Name=", catlevel3Name);
                        if (catlevel4Name) {
                            categoryUrl += getUrlEncodedParam("catlevel4Name=", catlevel4Name);
                        }
                    }
                }
                requestUrl += categoryUrl;
                break;
            case HOME_PAGE:
                break;
            default:
                throw new Error("Invalid page type: "+pageType);
        }

        requestUrl += "&uid=" + userId;

        function renderWidgetDataHorizontal(widget, recommendations, heading) {
            var maxProducts = horizontalConfig.products.max || horizontalConfig.products.max_products;
            var targetDOMElementId = widget;
            var clickHandler = itemClickHandler;
            // console.log("--------------------------------------->>>>>>");
            // console.log(recommendations);
            if (recommendations.length) {
                // console.log("--------------------------------------->");
                // console.log(maxProducts)
                if (maxProducts < recommendations.length) {
                    // console.log("maxProducts", maxProducts);
                    recommendations = recommendations.splice(0, maxProducts);
                    // console.log("recommendations", recommendations);
                }
                var options = {
                    template: horizontalTemplate,
                    targetDOMElementId: targetDOMElementId,
                    recommendations: recommendations,
                    heading: heading,
                    rexConsoleConfigs: horizontalConfig,
                    assets: horizontalAssets,
                    maxProducts: maxProducts,
                    clickHandler: clickHandler,
                    sliderClass: "recs-slider"
                }
                _unbxd_generateRexContent(options);
            }
        }


        function renderWidgetDataVertical(widget, recommendations, heading) {
            var maxProducts = verticalConfig.products.max || verticalConfig.products.max_products;
            var targetDOMElementId = widget;
            var clickHandler = itemClickHandler;
            if (recommendations.length) {
                if (maxProducts < recommendations.length) {
                    recommendations = recommendations.splice(0, maxProducts);
                }

                var itemsToShow = verticalConfig.products.visible || missingValueError('products.visible', rexConsoleConfigs);
               
                var options = {
                    template: verticalTemplate,
                    targetDOMElementId: targetDOMElementId,
                    recommendations: recommendations,
                    heading: heading,
                    rexConsoleConfigs: verticalConfig,
                    assets: verticalAssets,
                    maxProducts: maxProducts,
                    clickHandler: clickHandler,
                    isVertical: true,
                    sliderClass: "recs-vertical-slider",

                }
                _unbxd_generateRexContent(options);
            }
        }

        function handleWidgetRenderingVertical() {
            if (widget3) {
                var widget3Data = recommendationsResponse.widget3;
                var widget3Heading = widget3Data.widgetTitle;
                var widget3Recommendations = widget3Data.recommendations;
                renderWidgetDataVertical(widget3, widget3Recommendations, widget3Heading);
            }
        }

        function handleWidgetRendering() {
            if (widget1) {
                var widget1Data = recommendationsResponse.widget1;
                var widget1Heading = widget1Data.widgetTitle;
                var widget1Recommendations = widget1Data.recommendations;
                // console.log("------>widget1");
                renderWidgetDataHorizontal(widget1, widget1Recommendations, widget1Heading);
            }
            if (widget2) {
                var widget2Data = recommendationsResponse.widget2;
                var widget2Heading = widget2Data.widgetTitle;
                var widget2Recommendations = widget2Data.recommendations;
                // console.log("------>widget2");
                renderWidgetDataHorizontal(widget2, widget2Recommendations, widget2Heading);
            }

        }

        function horizontalTemplateHandler(err, res) {
            if (err) {
                throw new Error('Failed to fetch templates');
            }
            // populating the template string
            horizontalTemplate = res;
            // console.log("------>horizontalTemplateHandler");
            handleWidgetRendering();
        }

        function verticalTemplateHandler(err, res) {
            if (err) {
                throw new Error('Failed to fetch templates');
            }
            // populating the template string
            verticalTemplate = res;
            // console.log("------>verticalTemplateHandler");
            handleWidgetRenderingVertical();
        }

        /** Fetch recommendations response */
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
            var horizontalTemplate = recommendationsResponse.template.horizontal;
            horizontalConfig = horizontalTemplate.conf;
            horizontalAssets = horizontalConfig.assets;
            var templateUrlHorizontal = horizontalTemplate.scriptUrl;

            // console.log("templateUrlHorizontal---->", templateUrlHorizontal);

            /** Fetch template layout string */
            fetchData(templateUrlHorizontal, horizontalTemplateHandler);

            // vertical templates configuration
            var verticalTemplate = recommendationsResponse.template.vertical;
            verticalConfig = verticalTemplate.conf;
            verticalAssets = verticalConfig.assets;
            var templateUrlVertical = verticalTemplate.scriptUrl;

            /** Fetch vertical template layout string */
            fetchData(templateUrlVertical, verticalTemplateHandler);

        });
    }
})(window);


