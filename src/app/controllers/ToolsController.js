import playHandler from './handlers/playHandler';
import stopHandler from './handlers/stopHandler';
import setFpsHandler from './handlers/setFpsHandler';
import saveImgHandler from './handlers/saveImgHandler';
import saveAnimationHandler from './handlers/saveAnimationHandler';

import pen from './tools/Pen';
import line from './tools/Line';
import mover from './tools/Mover';
import eraser from './tools/Eraser';
import circle from './tools/Circle';
import rectangle from './tools/Rectangle';

import framesWorker from './tools/FramesWorker';

const controller = () => {
  let myAnimation;
  const frames = [];
  const framesTwo = [];
  const play = document.querySelector('.play');
  const stop = document.querySelector('.stop');
  const tools = document.querySelector('.tools');
  const preview = document.querySelector('.preview');
  const allFrames = document.querySelector('.frames');
  const saveImg = document.querySelector('.save__img');
  const fullScreenBtn = document.querySelector('.full');
  const canvas = document.querySelector('.canvas__field');
  const allButtons = document.getElementsByTagName('button');
  const addFrameBtn = document.querySelector('.frames__add');
  const fpsInput = document.querySelector('.animation__speed');
  const changeSizeInput = document.querySelector('.line__width');
  const colorSelector = document.querySelector('.color__selector');
  const saveAnimation = document.querySelector('.save__animation');
  const previewMonitor = document.querySelector('.preview__monitor');
  const framesWrapper = document.querySelector('.frames__template-wrapper');

  const state = {
    color: '',
    speed: '200',
    lineWidth: '10',
    currentTool: () => { },
  };

  setTimeout(() => {
    tools.style.left = '0';
    preview.style.right = '0';
    allFrames.style.left = '0';
  }, 0.1)

  const ctx = canvas.getContext('2d');
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  play.disabled = true;
  stop.disabled = true;
  play.classList.add('disable');
  stop.classList.add('disable');

  const disableObserver = new MutationObserver(() => {
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

  disableObserver.observe(framesWrapper, { childList: true });

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
        state.currentTool = () => pen(canvas, ctx, state.color, state.lineWidth);
        pen(canvas, ctx, state.color, state.lineWidth);
        break;
      case 'line active':
        state.currentTool = () => line(canvas, ctx, state.color, state.lineWidth);
        line(canvas, ctx, state.color, state.lineWidth);
        break;
      case 'bucket':
        break;
      case 'eraser active':
        state.currentTool = () => eraser(canvas, ctx, state.lineWidth);
        eraser(canvas, ctx, state.lineWidth);
        break;
      case 'circle active':
        state.currentTool = () => circle(canvas, ctx, state.color, state.lineWidth);
        circle(canvas, ctx, state.color, state.lineWidth);
        break;
      case 'rect active':
        state.currentTool = () => rectangle(canvas, ctx, state.color, state.lineWidth, canvas.height, canvas.width);
        rectangle(canvas, ctx, state.color, state.lineWidth, canvas.height, canvas.width);
        break;
      case 'dropper':
        break;
      case 'mover active':
        state.currentTool = () => mover(canvas, ctx, state.color, state.lineWidth, canvas.height, canvas.width);
        mover(canvas, ctx, state.color, state.lineWidth, canvas.height, canvas.width);
        break;
      default:
        break;
    }
  };

  const setColorHandler = () => {
    state.color = colorSelector.value;
    state.currentTool();
  };

  const setLineWidthHandler = (e) => {
    state.lineWidth = e.target.value;
    state.currentTool();
  };

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

  play.addEventListener('click', () => { myAnimation = playHandler(params, myAnimation); });
  stop.addEventListener('click', () => { myAnimation = stopHandler(params, myAnimation); });
  fpsInput.addEventListener('input', (e) => { state.speed = setFpsHandler(e, params); params.speed = setFpsHandler(e, params); });
};

document.addEventListener('DOMContentLoaded', controller);
