const saveImgHandler = (params) => {
    const { canvas } = params;
    
    const image = new Image();
    const imageData = canvas.toDataURL();
    const link = document.createElement('a');

    image.src = imageData;

    link.setAttribute('href', image.src);
    link.setAttribute('download', 'canvasImage');
    link.click();
};

export default saveImgHandler;