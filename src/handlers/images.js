export var appendImagesToClass = function(className,  imgUrl) {
    var elements = document.querySelectorAll('.'+className);
    for(var i=0; i< elements.length; i++){
        var img = document.createElement('img');
        img.src = imgUrl;
        elements[i].appendChild(img);
    }
}

export var appendImageToId = function(id, imgUrl) {
    var element = document.getElementById(id);
    var img = document.createElement('img');
    img.src = imgUrl;
    element.appendChild(img);
}

export var setImagesSource = function(imgArr){
    for(var i=0; i<imgArr.length; i++){
        appendImagesToClass(imgArr[i].classname, imgArr[i].url);
    }
}