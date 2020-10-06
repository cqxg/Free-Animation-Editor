const playHandler = (params, myAnimation) => {
    let { frames, framesTwo, speed, play, fpsInput, previewMonitor, framesWrapper, addFrameBtn } = params;

    let i = 0;

    if (framesTwo.length > 1) {
        myAnimation = setInterval(() => {
            let url = `url(${frames[i].dataURL}),`;
            url = url.slice(0, url.length - 2);
            previewMonitor.style.backgroundImage = url;
            if (i >= framesTwo.length - 1) i = 0;
            else i += 1;
        }, speed);
    }

    play.disabled = true;
    fpsInput.disabled = true;
    addFrameBtn.disabled = true;


    play.classList.add('disable');
    fpsInput.classList.add('disable');
    addFrameBtn.classList.add('disable');
    framesWrapper.classList.add('disable');

    return myAnimation;
};

export default playHandler;