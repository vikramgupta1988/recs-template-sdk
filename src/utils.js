export const MOBILE = 'mobile';
export const DESKTOP = 'desktop';
export const SMALL = 'small';
export const LARGE = 'large';

export const getDeviceType = () => {
    console.log("screen.width: ", window.screen.width);
    console.log("screen.height: ", window.screen.height);
    const mediaQueryList = window.matchMedia("(orientation: portrait)");
    if (mediaQueryList.matches) {
        console.log('portrait mode')
        if (window.screen.width <= 667) {
            return MOBILE;
        } else {
            return DESKTOP;
        }
    } else {
        console.log('landscape mode')
        if (window.screen.height <= 667) {
            return MOBILE;
        } else {
            return DESKTOP;
        }
    }
}

export const getBrowserSize = () => {
    console.log("window.innerWidth: ", window.innerWidth);
    console.log("window.innerHeight: ", window.innerHeight);
    if (window.innerWidth <= 667) {
        return SMALL;
    } else {
        return LARGE;
    }
}

/**
     * Global declaration section
     */

/** Function for fetching api requests */
export const fetchData = (url, setHeader, cb) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
            // Typical action to be performed when the document is ready:
            var requestId
            // Get request id only during call of recommendation API
            if (setHeader) {
                requestId = this.getResponseHeader("x-request-id");
            }
            cb(null, xhttp.responseText, requestId);
        }
        else if (this.readyState == 4 && (this.status != 200 || this.status != 204)) {
            cb('Invalid network request: ' + url);
        }
    };
    xhttp.onerror = function () {
        cb('Failed network request: ' + url);
    }
    xhttp.open("GET", url, true);
    if (setHeader)
        xhttp.setRequestHeader("unbxd-device-type", window.unbxdDeviceType);
    xhttp.send();
}
