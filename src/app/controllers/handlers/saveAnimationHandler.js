import GIF from '../../gif/dist/gif';

const saveAnimationHandler = (frames, width, height, speed) => {
    let framesAnim = [];

    frames.map(item => framesAnim.push(item.dataURL));

    const gif = new GIF({
        workers: 2,
        quality: 1,
        width: width,
        height: height,
    });

    for (let i = 0; i < framesAnim.length; i += 1) {
        const image = new Image();
        image.src = framesAnim[i];

        gif.addFrame(image, {
            delay: speed,
        });
    };

    gif.render();
    gif.on('finished', (blob) => {
        const element = document.createElement('a');
        
        element.setAttribute('href', URL.createObjectURL(blob));
        element.setAttribute('download', 'filename');
        element.click();
    });

    framesAnim = [];
};

export default saveAnimationHandler;