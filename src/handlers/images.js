export var appendImagesToClass = function(className,  imgUrl, altText, targetContainerId) {
    var elements = document.querySelectorAll("#"+targetContainerId+" ."+className);
    for(var i=0; i< elements.length; i++){
        var img = document.createElement('img');
        img.src = imgUrl;
        img.alt = altText;
        elements[i].appendChild(img);
    }
}

export var setImagesSource = function(imgArr, targetContainerId){
    for(var i=0; i<imgArr.length; i++){
        appendImagesToClass(imgArr[i].classname, imgArr[i].url, imgArr[i].altText, targetContainerId);
    }
}
