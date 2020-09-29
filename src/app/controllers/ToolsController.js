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

  for (let i = 0; i < 8; i++) {
    allButtons[i].addEventListener('click', () => {
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active');
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

  const animate = (i) => {
    let url = `url(${frames[i].dataURL}),`;
    url = url.slice(0, url.length - 2);
    previewMonitor.style.backgroundImage = url;
  };

  const playHandler = () => {
    let i = 0;

    if (framesTwo.length > 1) {
      myAnimation = setInterval(() => {
        animate(i);
        if (i >= framesTwo.length - 1) i = 0;
        else i += 1;
      }, state.speed);
    }

    play.disabled = true;
    fpsInput.disabled = true;
    play.classList.add('disable');
    fpsInput.classList.add('disable');
  };

  const stopHandler = () => {
    clearInterval(myAnimation);

    play.disabled = false;
    fpsInput.disabled = false;
    play.classList.remove('disable');
    fpsInput.classList.remove('disable');
  };

  const setColorHandler = () => {
    state.color = colorSelector.value;
    pen(canvas, ctx, state.color, state.lineWidth);
  };

  const setLineWidthHandler = (e) => {
    state.lineWidth = e.target.value;
    pen(canvas, ctx, state.color, state.lineWidth);
  };

  const setFpsHandler = (e) => {
    state.speed = 600 / e.target.value;
  };

  play.addEventListener('click', playHandler);
  stop.addEventListener('click', stopHandler);
  tools.addEventListener('click', toolIdentifier);
  fpsInput.addEventListener('input', setFpsHandler);
  colorSelector.addEventListener('input', setColorHandler);
  changeSizeInput.addEventListener('input', setLineWidthHandler);
  addFrameBtn.addEventListener('click', () => framesWorker(canvas, ctx, frames, framesTwo));
};

document.addEventListener('DOMContentLoaded', controller);
