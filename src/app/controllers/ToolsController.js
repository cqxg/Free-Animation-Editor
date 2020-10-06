import saveImgHandler from './handlers/saveImgHandler';
import saveAnimationHandler from './handlers/saveAnimationHandler';
import setFpsHandler from './handlers/setFpsHandler';
import playHandler from './handlers/playHandler';
import stopHandler from './handlers/stopHandler';

import pen from './tools/Pen';
import framesWorker from './tools/FramesWorker';

const controller = () => {
  let myAnimation;
  const frames = [];
  const framesTwo = [];
  const stop = document.querySelector('.stop');
  const play = document.querySelector('.play');
  const tools = document.querySelector('.tools');
  const canvas = document.querySelector('.canvas__field');
  const addFrameBtn = document.querySelector('.frames__add');
  const allButtons = document.getElementsByTagName('button');
  const fpsInput = document.querySelector('.animation__speed');
  const changeSizeInput = document.querySelector('.line__width');
  const colorSelector = document.querySelector('.color__selector');
  const framesWrapper = document.querySelector('.frames__template-wrapper');
  const saveImg = document.querySelector('.save__img');
  const saveAnimation = document.querySelector('.save__animation');
  const previewMonitor = document.querySelector('.preview__monitor');

  const state = {
    color: '',
    speed: '200',
    currTool: 'pen',
    lineWidth: '10',
  };

  const ctx = canvas.getContext('2d');
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  play.disabled = true;
  play.classList.add('disable');

  const observer = new MutationObserver(() => {
    if (framesTwo.length > 1) {
      play.disabled = false;
      play.classList.remove('disable');
    } else {
      play.disabled = true;
      play.classList.add('disable');
    }
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
        state.currTool = 'pen';
        pen(canvas, ctx, state.color, state.lineWidth);
        break;
      case 'line':
        console.log('u want line');
        break;
      case 'bucket':
        console.log('u want bucket');
        break;
      case 'eraser':
        console.log('u erase');
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

  const setColorHandler = () => {
    state.color = colorSelector.value;
    pen(canvas, ctx, state.color, state.lineWidth);
  };

  const setLineWidthHandler = (e) => {
    state.lineWidth = e.target.value;
    pen(canvas, ctx, state.color, state.lineWidth);
  };

  tools.addEventListener('click', toolIdentifier);
  colorSelector.addEventListener('input', setColorHandler);
  changeSizeInput.addEventListener('input', setLineWidthHandler);
  saveImg.addEventListener('click', () => saveImgHandler(params));
  addFrameBtn.addEventListener('click', () => framesWorker(canvas, ctx, frames, framesTwo));
  fpsInput.addEventListener('input', (e) => { state.speed = setFpsHandler(e, state.speed) });
  saveAnimation.addEventListener('click', () => saveAnimationHandler(frames, canvas.width, canvas.height, state.speed));
  stop.addEventListener('click', () => { myAnimation = stopHandler(myAnimation, play, fpsInput, framesWrapper, addFrameBtn) });
  play.addEventListener('click', () => { myAnimation = playHandler(frames, framesTwo, state.speed, myAnimation, play, fpsInput, previewMonitor, framesWrapper, addFrameBtn) });
};

document.addEventListener('DOMContentLoaded', controller);
