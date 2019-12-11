export const appendImagesToClass = (className,  imgUrl) => {
    const elements = document.querySelectorAll(`.${className}`);
    for(let i=0; i< elements.length; i++){
        const img = document.createElement('img');
        img.src = imgUrl;
        elements[i].appendChild(img);
    }
}

export const appendImageToId = (id, imgUrl) => {
    const element = document.getElementById(id);
    const img = document.createElement('img');
    img.src = imgUrl;
    element.appendChild(img);
}

export const setImagesSource = (imgArr) => {
    imgArr.forEach(img => {
        const { classname, url } = img;
        appendImagesToClass(classname, url);
    });
}