const stopHandler = (myAnimation, play, fpsInput, framesWrapper, addFrameBtn) => {
    clearInterval(myAnimation);

    play.disabled = false;
    fpsInput.disabled = false;
    addFrameBtn.disabled = false;

    play.classList.remove('disable');
    fpsInput.classList.remove('disable');
    addFrameBtn.classList.remove('disable');
    framesWrapper.classList.remove('disable');
};

export default stopHandler;