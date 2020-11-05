const stopHandler = (params, myAnimation) => {
  const {
    play, fpsInput, framesWrapper, addFrameBtn,
  } = params;

  clearInterval(myAnimation);

  play.disabled = false;
  fpsInput.disabled = false;
  addFrameBtn.disabled = false;

  play.classList.remove('disable');
  fpsInput.classList.remove('disable');
  addFrameBtn.classList.remove('disable');
  framesWrapper.classList.remove('disable');

  return myAnimation;
};

export default stopHandler;
