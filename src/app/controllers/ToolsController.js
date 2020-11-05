import playHandler from './handlers/playHandler';
import stopHandler from './handlers/stopHandler';
import setFpsHandler from './handlers/setFpsHandler';
import saveImgHandler from './handlers/saveImgHandler';
import saveAnimationHandler from './handlers/saveAnimationHandler';

import pen from './tools/Pen';
// import eraser from './tools/eraser';

import framesWorker from './tools/FramesWorker';

const controller = () => {
  let myAnimation;
  const frames = [];
  const framesTwo = [];
  const play = document.querySelector('.play');
  const stop = document.querySelector('.stop');
  const tools = document.querySelector('.tools');
  const saveImg = document.querySelector('.save__img');
  const canvas = document.querySelector('.canvas__field');
  const allButtons = document.getElementsByTagName('button');
  const addFrameBtn = document.querySelector('.frames__add');
  const fpsInput = document.querySelector('.animation__speed');
  const changeSizeInput = document.querySelector('.line__width');
  const colorSelector = document.querySelector('.color__selector');
  const saveAnimation = document.querySelector('.save__animation');
  const previewMonitor = document.querySelector('.preview__monitor');
  const framesWrapper = document.querySelector('.frames__template-wrapper');
  const fullScreenBtn = document.querySelector('.full');

  const state = {
    color: '',
    speed: '200',
    lineWidth: '10',
    currentTool: () => { }
  };

  const ctx = canvas.getContext('2d');
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  play.disabled = true;
  stop.disabled = true;
  play.classList.add('disable');
  stop.classList.add('disable');

  const observer = new MutationObserver(() => {
    if (framesTwo.length > 1) {
      play.disabled = false;
      stop.disabled = false;
      play.classList.remove('disable');
      stop.classList.remove('disable');
    } else {
      play.disabled = true;
      stop.disabled = true;
      play.classList.add('disable');
      stop.classList.add('disable');
    }
  });

  const observer = new MutationObserver(() => {

  });

  const observer = new MutationObserver(() => {

  });

  observer.observe(framesWrapper, { childList: true });

  for (let i = 0; i < 8; i++) {
    allButtons[i].addEventListener('click', () => {
      for (let j = 0; j < allButtons.length; j++) {
        allButtons[j].classList.remove('active');
      }
      allButtons[i].classList.add('active');
    });
  }

  const toolIdentifier = (e) => {
    switch (e.target.className) {
      case 'pen active':
        state.currentTool = pen(canvas, ctx, state.color, state.lineWidth);
        pen(canvas, ctx, state.color, state.lineWidth);
        break;
      case 'line':
        console.log('u want line');
        break;
      case 'bucket':
        console.log('u want bucket');
        break;
      case 'eraser active':
        state.currentTool = pen(canvas, ctx, state.color = 'rgb(255,255,255)', state.lineWidth);
        pen(canvas, ctx, state.color = 'rgb(255,255,255)', state.lineWidth);
        break;
      case 'circle':
        console.log('u want circle');
        break;
      case 'rect':
        console.log('u want rect');
        break;
      case 'dropper':
        console.log('u want dropper');
        break;
      case 'mover':
        console.log('u want mover');
        break;
      default:
        console.log('never choose');
        break;
    }
  };

  // const setColorHandler = () => {
  //   state.color = colorSelector.value;
  //   pen(canvas, ctx, state.color, state.lineWidth);
  // };

  // const setLineWidthHandler = (e) => {
  //   state.lineWidth = e.target.value;
  //   pen(canvas, ctx, state.color, state.lineWidth);
  // };

  const params = {
    ctx,
    play,
    frames,
    canvas,
    fpsInput,
    framesTwo,
    addFrameBtn,
    framesWrapper,
    previewMonitor,
    speed: state.speed,
    width: canvas.width,
    height: canvas.height,
  };

  tools.addEventListener('click', toolIdentifier);
  colorSelector.addEventListener('input', setColorHandler);
  changeSizeInput.addEventListener('input', setLineWidthHandler);
  fullScreenBtn.addEventListener('click', () => previewMonitor.requestFullscreen());

  saveImg.addEventListener('click', () => saveImgHandler(params));
  addFrameBtn.addEventListener('click', () => framesWorker(params));
  saveAnimation.addEventListener('click', () => saveAnimationHandler(params));

  play.addEventListener('click', () => { myAnimation = playHandler(params, myAnimation) });
  stop.addEventListener('click', () => { myAnimation = stopHandler(params, myAnimation) });
  fpsInput.addEventListener('input', (e) => { state.speed = setFpsHandler(e, params); params.speed = setFpsHandler(e, params) });
};

document.addEventListener('DOMContentLoaded', controller);
