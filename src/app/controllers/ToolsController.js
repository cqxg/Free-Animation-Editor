import GIF from '../gif/dist/gif';

import pen from './tools/Pen';
import framesWorker from './tools/FramesWorker';

const controller = () => {
  let myAnimation;
  const frames = [];
  const framesTwo = [];
  let framesAnim = [];
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
  const framesWrapper = document.querySelector('.frames__template-wrapper');
  const saveImg = document.querySelector('.save__img');
  const saveAnimation = document.querySelector('.save__animation');

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
    addFrameBtn.disabled = true;


    play.classList.add('disable');
    fpsInput.classList.add('disable');
    addFrameBtn.classList.add('disable');
    framesWrapper.classList.add('disable');
  };

  const stopHandler = () => {
    clearInterval(myAnimation);

    play.disabled = false;
    fpsInput.disabled = false;
    addFrameBtn.disabled = false;

    play.classList.remove('disable');
    fpsInput.classList.remove('disable');
    addFrameBtn.classList.remove('disable');
    framesWrapper.classList.remove('disable');
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

  const saveCanvasAsImageFile = () => {
    const image = new Image();
    const imageData = canvas.toDataURL();
    const link = document.createElement('a');

    image.src = imageData;

    link.setAttribute('href', image.src);
    link.setAttribute('download', 'canvasImage');
    link.click();
  };

  // ---------------------------------------------WORK WITH ANIMATIONА ---------------------------------------------------------------
  // const prevAnimation = () => {
  //   console.log(frames)
  //   for (let i = 0; i < frames.length; i += 1) {
  //     let len = frames[i].imageData.data.length;
  //     console.log(frames[i].imageData.data.length)
  //     for (let j = 0; j < len; j += 1) {
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);
  //       const newImg = new Image();
  //       newImg.src = frames[i].imageData.data[j];
  //       ctx.drawImage(newImg, 0, 0);
  //     }
  //     const dataURL = canvas.toDataURL();
  //     framesAnim.push(dataURL);
  //     clear();
  //   }
  // }

  const download = (file) => {
    const element = document.createElement('a');
    element.setAttribute('href', file);
    element.setAttribute('download', 'filename');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const saveFramesAsGifFile = () => {
    frames.map(item => framesAnim.push(item.dataURL));

    console.log(framesAnim)

    const gif = new GIF({
      workers: 2,
      quality: 1,
      width: canvas.width,
      height: canvas.height,
    });
    for (let i = 0; i < framesAnim.length; i += 1) {
      const newImg = new Image();
      newImg.src = framesAnim[i];
      gif.addFrame(newImg, {
        delay: state.speed,
      });
    }
    let resultGif;
    gif.render();
    gif.on('finished', (blob) => {
      resultGif = URL.createObjectURL(blob);
      console.log(resultGif);
      download(resultGif);
    });
    framesAnim = [];
  }

  // ---------------------------------------------WORK WITH ANIMATIONА ---------------------------------------------------------------


  play.addEventListener('click', playHandler);
  stop.addEventListener('click', stopHandler);
  tools.addEventListener('click', toolIdentifier);
  fpsInput.addEventListener('input', setFpsHandler);
  colorSelector.addEventListener('input', setColorHandler);
  saveImg.addEventListener('click', saveCanvasAsImageFile);
  saveAnimation.addEventListener('click', saveFramesAsGifFile);
  changeSizeInput.addEventListener('input', setLineWidthHandler);
  addFrameBtn.addEventListener('click', () => framesWorker(canvas, ctx, frames, framesTwo));
};

document.addEventListener('DOMContentLoaded', controller);
