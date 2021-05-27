import { getDeviceType, getBrowserSize, MOBILE, SMALL, fetchData } from './utils';
import environment from './environment';

export default class getUnbxdRecommendations {
    constructor(context) {
        this.HOME_PAGE = 'home';
        this.PRODUCT_PAGE = 'product';
        this.CATEGORY_PAGE = 'category';
        this.CART_PAGE = 'cart';
        this.allowedPageTypes = [this.HOME_PAGE, this.PRODUCT_PAGE, this.CATEGORY_PAGE, this.CART_PAGE];
        // getting page info
        this.pageType = this.getPageDetails(context.pageInfo);
        var platformDomain = environment[process.env.NODE_ENV].url;

        // getting template Info
        window.unbxdDeviceType = this.getTemplateDetails(context)

        // get widget if
        var widgets = context.widgets;
        this.widget1 = this.getWidgetId(this.pageType, 'widget1', widgets);
        this.widget2 = this.getWidgetId(this.pageType, 'widget2', widgets);
        this.widget3 = this.getWidgetId(this.pageType, 'widget3', widgets);
        if (!this.widget1 && !this.widget2 && !this.widget3) {
            throw new Error('No widget id provided');
        }
        this.itemClickHandler = this.getClickHandler(context);
        this.dataParser = this.getDataParserHandler(context);
        this.eventQueue = window.eventQueue;

        // getting userId, siteKey and apiKey
        var userInfo = context.userInfo;

        var userId = (userInfo && userInfo.userId) || this.getCookie('unbxd.userId');
        var siteKey = (userInfo && userInfo.siteKey) || window.UnbxdSiteName;
        var apiKey = (userInfo && userInfo.apiKey) || window.UnbxdApiKey;

        var requestUrl = platformDomain + apiKey + "/" + siteKey + '/items?&template=true&pageType=';

        if (!userId) {
            throw new Error("user id is missing");
        }

        if (!siteKey) {
            throw new Error("site Key is missing");
        }

        if (!apiKey) {
            throw new Error("api key is missing");
        }

        requestUrl += encodeURIComponent(this.pageType);
        // requestUrl += "&unbxdDeviceType=" + encodeURIComponent(window.unbxdDeviceType);
        var pageInfo = context.pageInfo;
        switch (this.pageType.toLowerCase()) {
            case this.PRODUCT_PAGE:
            case this.CART_PAGE:
                if (pageInfo.productIds) {
                    requestUrl += this.getProductIdsAsUrlParams(pageInfo.productIds);
                }
                break;
            case this.CATEGORY_PAGE:
                var categoryUrl = '';
                var catlevel1Name = pageInfo.catlevel1Name;
                var catlevel2Name = pageInfo.catlevel2Name;
                var catlevel3Name = pageInfo.catlevel3Name;
                var catlevel4Name = pageInfo.catlevel4Name;

                if (catlevel1Name) {
                    categoryUrl = "&" + this.getUrlEncodedParam("catlevel1Name", catlevel1Name);
                    if (catlevel2Name) {
                        categoryUrl += "&" + this.getUrlEncodedParam("catlevel2Name", catlevel2Name);
                        if (catlevel3Name) {
                            categoryUrl += "&" + this.getUrlEncodedParam("catlevel3Name", catlevel3Name);
                            if (catlevel4Name) {
                                categoryUrl += "&" + this.getUrlEncodedParam("catlevel4Name", catlevel4Name);
                            }
                        }
                    }
                }
                requestUrl += categoryUrl;
                break;
            case this.HOME_PAGE:
                break;
            default:
                throw new Error("Invalid page type: " + this.pageType);
        }

        requestUrl += "&uid=" + userId;

        // Adding extra parameters to the API
        const extraParams = context.extraParams;
        if(extraParams && typeof extraParams === 'object' && Object.keys(extraParams).length > 0) {
            let extraParamsRequest = '';
            const extraParamKeys = Object.keys(extraParams);
            extraParamKeys.forEach((param, index) => {
                if(index > 0) {
                    extraParamsRequest += '&';
                }
                extraParamsRequest += `${param}=${encodeURIComponent(extraParams[param])}`
            });
            requestUrl += `&${extraParamsRequest}`;
        }

        /** Fetch recommendations response */
        // to store recommendations response
        // to store template string
        // to store vertical template string
        this.compressedStyleVertical = '';
        var ref = this;
        fetchData(requestUrl, true, function (err, res, requestId) {
            // fetching data specific to a page type
            if (err) {
                throw new Error('Failed to fetch recommendations');
            }
            ref.recommendationsResponse = JSON.parse(res);

            // horizontal desktop templates configuration
            ref.horizontalTemplate = ref.recommendationsResponse.template.horizontal;
            ref.reqId = requestId;
            if (ref.horizontalTemplate) {
                ref.horizontalConfig = ref.horizontalTemplate.conf;
                ref.horizontalAssets = ref.horizontalConfig.assets;
                var templateUrlHorizontal = ref.horizontalTemplate.scriptUrl;
                if (templateUrlHorizontal) {

                    /** Fetch template layout string */
                    fetchData(templateUrlHorizontal, false, ref.horizontalTemplateHandler);
                }
                else {
                    console.warn("script url not found for horizontal template")
                }
            }
            // vertical templates configuration
            ref.verticalTemplate = ref.recommendationsResponse.template.vertical;
            if (ref.verticalTemplate) {
                ref.verticalConfig = ref.verticalTemplate.conf;
                ref.verticalAssets = ref.verticalConfig.assets;
                var templateUrlVertical = ref.verticalTemplate.scriptUrl;
                if (templateUrlVertical) {
                    /** Fetch vertical template layout string */
                    fetchData(templateUrlVertical, false, ref.verticalTemplateHandler);
                }
                else {
                    console.warn("script url not found for vertical template")
                }
            }
        });
    }
    getWidgetId(pageType, widgetKey, widgetDetails) {
        console.log(pageType, widgetKey, widgetDetails)
        var widgetIdLocal;
        if (widgetDetails) {
            return widgetDetails[widgetKey] ? widgetDetails[widgetKey].name : null;
        } else {
            widgetIdLocal = widgetIdMap[pageType.toLowerCase()][widgetKey];
            // Check if widget exists in the page
            if (document.getElementById(widgetIdLocal)) {
                return widgetIdLocal;
            } else {
                return null;
            }
        }
        return null;
    }

    getPageDetails(pageInfo) {
        if (!pageInfo || !pageInfo.pageType) {
            throw new Error("Page type info missing");
        }
        var pageTypeLocal = pageInfo.pageType;
        if (this.allowedPageTypes.indexOf(pageTypeLocal.toLowerCase()) == -1) {
            throw new Error("Invalid value for page type");
        }
        return pageTypeLocal;
    }

    getTemplateDetails(context) {
        var device = getDeviceType();
        var browserSize = getBrowserSize();

        if (context.unbxdDeviceType && context.unbxdDeviceType.mobileBrowser)
            return "mobile-browser";
        else if (context.unbxdDeviceType && context.unbxdDeviceType.desktopBrowser)
            return "desktop-browser";
        else if (device === MOBILE || browserSize === SMALL) {
            return "mobile-browser";
        }
        else {
            return "desktop-browser";
        }
    }

    getClickHandler(context) {
        return context.itemClickHandler;
    }

    getDataParserHandler(context) {
        return context.dataParser;
    }

    getUrlEncodedParam(paramName, paramValue) {
        return "" + paramName + "=" + encodeURIComponent(paramValue);
    }

    getProductIdsAsUrlParams(productIdsList) {
        var queryStringLocal = '';
        const ref = this;
        if (productIdsList instanceof Array) {
            productIdsList.forEach(function (item) {
                queryStringLocal += '&' + ref.getUrlEncodedParam('id', item);
            });
        } else {
            queryStringLocal += '&' + ref.getUrlEncodedParam('id', productIdsList);
        }
        return queryStringLocal;
    }

    getCookie(key) {
        var allcookies = document.cookie;
        var name, value;

        // Get all the cookies pairs in an array
        var cookiearray = allcookies.split(';');

        // Now take key value pair out of this array
        for (var i = 0; i < cookiearray.length; i++) {
            name = cookiearray[i].split('=')[0];
            value = cookiearray[i].split('=')[1];
            //document.write ("Key is : " + name + " and Value is : " + value);
            if (name.trim() === key) {
                return value;
            }
        }
    }

    renderWidgetDataHorizontal(widget, widgetNum, recommendations, heading) {
        var maxProducts = this.horizontalConfig.products.max || this.horizontalConfig.products.max_products;
        var targetDOMElementId = widget;
        var clickHandler = this.itemClickHandler;
        if (maxProducts < recommendations.length) {
            recommendations = recommendations.splice(0, maxProducts);
        }
        var options = {
            template: this.horizontalTemplate,
            targetDOMElementId: targetDOMElementId,
            recommendations: recommendations,
            heading: heading,
            rexConsoleConfigs: this.horizontalConfig,
            assets: this.horizontalAssets,
            maxProducts: maxProducts,
            clickHandler: clickHandler,
            dataParser: this.dataParser,
            eventQueue: this.eventQueue,
            widgetNum: widgetNum,
            pageType: this.pageType,
            reqId: this.reqId,
            sliderClass: "_unbxd_recs-slider",
            compressedStyle: this.compressedStyle
        }
        _unbxd_generateRexContent(options);
    }


    renderWidgetDataVertical(widget, widgetNum, recommendations, heading) {
        var maxProducts = this.verticalConfig.products.max || this.verticalConfig.products.max_products;
        var targetDOMElementId = widget;
        var clickHandler = this.itemClickHandler;
        if (maxProducts < recommendations.length) {
            recommendations = recommendations.splice(0, maxProducts);
        }

        var options = {
            template: this.verticalTemplate,
            targetDOMElementId: targetDOMElementId,
            recommendations: recommendations,
            heading: heading,
            rexConsoleConfigs: this.verticalConfig,
            assets: this.verticalAssets,
            maxProducts: maxProducts,
            clickHandler: clickHandler,
            eventQueue: this.eventQueue,
            dataParser: this.dataParser,
            widgetNum: widgetNum,
            pageType: this.pageType,
            reqId: this.reqId,
            isVertical: true,
            sliderClass: "_unbxd_recs-vertical-slider",
            compressedStyle: this.compressedStyleVertical

        }
        _unbxd_generateRexContent(options);
    }

    handleWidgetRenderingVertical() {
        if (this.widget3) {
            var widget3Data = this.recommendationsResponse.widget3;
            var widget3Heading = widget3Data.widgetTitle;
            var widget3Recommendations = widget3Data.recommendations;
            this.renderWidgetDataVertical(this.widget3, 3, widget3Recommendations, widget3Heading);
        }
    }

    handleWidgetRendering() {
        if (this.widget1) {
            var widget1Data = this.recommendationsResponse.widget1;
            var widget1Heading = widget1Data.widgetTitle;
            var widget1Recommendations = widget1Data.recommendations;
            this.renderWidgetDataHorizontal(this.widget1, 1, widget1Recommendations, widget1Heading);
        }
        if (this.widget2) {
            var widget2Data = this.recommendationsResponse.widget2;
            var widget2Heading = widget2Data.widgetTitle;
            var widget2Recommendations = widget2Data.recommendations;
            this.renderWidgetDataHorizontal(this.widget2, 2, widget2Recommendations, widget2Heading);
        }

    }

    horizontalTemplateHandler = (err, res) => {
        if (err) {
            throw new Error('Failed to fetch templates');
        }
        // populating the template string
        this.horizontalTemplate = res;
        this.handleWidgetRendering();
    }

    verticalTemplateHandler = (err, res) => {
        if (err) {
            throw new Error('Failed to fetch templates');
        }
        // populating the template string
        this.verticalTemplate = res;
        this.handleWidgetRenderingVertical();
    }

    _unbxd_generateRexContent = (options) => {
        // console.log(options)
        /** Template rendering logic */
        var template = options.template || missingValueError('template', options);
        var targetDOMElementId = options.targetDOMElementId || missingValueError('targetDOMElementId', options);
        var recommendations = options.recommendations || missingValueError('recommendations', options);
        var heading = options.heading || missingValueError('heading', options);
        var rexConsoleConfigs = options.rexConsoleConfigs || missingValueError('rexConsoleConfigs', options);
        var itemsToShow = rexConsoleConfigs.products.visible || missingValueError('products.visible', rexConsoleConfigs);
        var maxProducts = rexConsoleConfigs.products.max || missingValueError('products.max', rexConsoleConfigs.products);
        var clickHandler = options.clickHandler;
        var dataParser = options.dataParser;
        var eventQueue = options.eventQueue;
        var isVertical = options.isVertical || false;
        this.compressedStyle = rexConsoleConfigs.css || missingValueError('css', rexConsoleConfigs);
        var recommendationsModified = null;
        var widgetWidthData = rexConsoleConfigs.widget.width || missingValueError('products.widget.width', rexConsoleConfigs.widget);
        // var widgetWidthData = verticalConfig.width;
        var widgetWidth = "";
        if (widgetWidthData.value && widgetWidthData.value != 0) {
            widgetWidth = widgetWidthData.value + widgetWidthData.unit;
        }

        var renderFn = doT.template(template);
        var renderTargetEl = document.getElementById(targetDOMElementId);

        // console.log(screen.width)
        // console.log(window.innerWidth);
        var device = getDeviceType();
        var browserSize = getBrowserSize();
        var itemsToShowOnMobile, itemWidth, itemWidthUnit;

        if (window.unbxdDeviceType === "mobile-browser" || options.unbxdDeviceType === "mobile-browser") {
            itemWidth = (rexConsoleConfigs.products && rexConsoleConfigs.products.width && rexConsoleConfigs.products.width.value) || 0;
            itemWidthUnit = (rexConsoleConfigs.products && rexConsoleConfigs.products.width && rexConsoleConfigs.products.width.unit) || 'px';
            if (rexConsoleConfigs && rexConsoleConfigs.products && rexConsoleConfigs.products.visibleOn) {
                itemsToShowOnMobile = rexConsoleConfigs.products.visibleOn.mobile;
            } else {
                itemsToShowOnMobile = rexConsoleConfigs.products.visible;
            }
            itemsToShow = itemsToShowOnMobile ? itemsToShowOnMobile : 2;
        }
        else if (device === MOBILE || browserSize === SMALL) {
            itemWidth = (rexConsoleConfigs.products && rexConsoleConfigs.products.width && rexConsoleConfigs.products.width.value) || 0;
            itemWidthUnit = (rexConsoleConfigs.products && rexConsoleConfigs.products.width && rexConsoleConfigs.products.width.unit) || 'px';
            if (rexConsoleConfigs && rexConsoleConfigs.products && rexConsoleConfigs.products.visibleOn) {
                itemsToShowOnMobile = rexConsoleConfigs.products.visibleOn.mobile;
            } else {
                itemsToShowOnMobile = rexConsoleConfigs.products.visible;
            }
            itemsToShow = itemsToShowOnMobile ? itemsToShowOnMobile : 2;
        } else {
            if (rexConsoleConfigs && rexConsoleConfigs.products && rexConsoleConfigs.products.visibleOn) {
                itemsToShow = rexConsoleConfigs.products.visibleOn.desktop;
            } else {
                itemsToShow = rexConsoleConfigs.products.visible;
            }
            itemsToShow = itemsToShow ? itemsToShow : 2;
        }

        if (!renderTargetEl) {
            return sendWarning('The target element id <' + targetDOMElementId + '> is not present in DOM. Execution can not continue');
        }

        if (maxProducts < recommendations.length) {
            recommendations = recommendations.splice(0, maxProducts);
        }

        if (isVertical) {
            recommendationsModified = [];
            for (var i = 0; i < recommendations.length; i++) {
                if (i % (itemsToShow) === 0) {
                    var slicedItems = recommendations.slice(i, i + itemsToShow);
                    recommendationsModified.push(slicedItems);
                }
            }
        }

        var templateData = {
            recommendations: recommendationsModified || recommendations,
            heading: heading,
            analyticsData: {
                widgetNum: 'WIDGET' + options.widgetNum,
                pageType: options.pageType,
                requestId: options.reqId
            }
        }

        /* Callback to make any modification to data and pass on the modified data to renderFn  */
        if (dataParser && typeof (dataParser) === "function") {
            templateData = dataParser(templateData)
        }
        if (eventQueue && typeof (eventQueue['beforeTemplateRender']) === "function") {
            var beforeTemplateRenderCallback = eventQueue['beforeTemplateRender']
            templateData = beforeTemplateRenderCallback(templateData);
        }

        document.getElementById(targetDOMElementId).innerHTML = renderFn(templateData);

        /** Dynamically adjusting width based on no of items to be shown */
        var sliderOptionsConfig = {
            rexConsoleConfigs: rexConsoleConfigs,
            recommendations: recommendations,
            recommendationsModified: recommendationsModified,
            clickHandler: clickHandler,
            itemsToShow: itemsToShow,
            itemWidth: itemWidth,
            itemWidthUnit: itemWidthUnit,
            maxProducts: maxProducts,
            assets: options.assets,
            sliderType: (isVertical || !window.unbxdDeviceType === "mobile-browser") ? "vertical" : "horizontal",
            sliderClass: (isVertical || !window.unbxdDeviceType === "mobile-browser") ? "_unbxd_recs-vertical-slider" : "_unbxd_recs-slider",
            widgetWidth: widgetWidth
        }

        // no of items to be shown
        if (isVertical) {
            global._unbxd_recsItemToScrollVt = itemsToShow;
        }
        else if (window.unbxdDeviceType === "mobile-browser") {
            global._unbxd_recsItemToScrollHz = itemsToShow;
        }
        else {
            global._unbxd_recsItemToScrollHz = itemsToShow;
        }

        /** Attaching styles for the slider */
        var eventHandlerStyle = document.createElement('style');
        eventHandlerStyle.type = 'text/css';
        // innerHTML needs to stay as es5 since it will be embedded directly to client's browser
        eventHandlerStyle.innerHTML = this.compressedStyle;
        document.head.appendChild(eventHandlerStyle);

        handleSizeCalculations(targetDOMElementId, sliderOptionsConfig);

        /* Callback to make any modification to data and pass on the modified data to renderFn  */
        if (eventQueue && typeof (eventQueue['afterTemplateRender']) === "function") {
            var afterTemplateRenderCallback = eventQueue['afterTemplateRender']
            templateData = afterTemplateRenderCallback(isVertical);
        }

    }

}
