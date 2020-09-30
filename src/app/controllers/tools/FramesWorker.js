const framesWorker = (canvas, ctx, frames, framesTwo) => {
  const { width, height } = canvas;
  let dataURL = canvas.toDataURL();
  let imageData = ctx.getImageData(0, 0, width, height);

  const saveFrameBtn = document.querySelector('.frames__save');
  const frameTemplate = document.querySelector('.frame__template');
  const framesWrapper = document.querySelector('.frames__template-wrapper');

  const id = frames.length + Math.random().toString(16).slice(2);

  frames.push({ dataURL, id });
  framesTwo.push({ imageData, id });

  const clear = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
  };

  const createFrame = () => {
    const fragment = document.createDocumentFragment();
    const newFrame = document.importNode(frameTemplate.content, true);

    const frame = newFrame.querySelector('.frame');
    const frameImage = newFrame.querySelector('.frame__image');
    const frameCopy = newFrame.querySelector('.frame__btn-copy');
    const frameDelete = newFrame.querySelector('.frame__btn-delete');

    frameImage.src = dataURL;
    frame.setAttribute('id', id);

    const frameDeleteHandler = (e) => {
      const index = framesTwo.findIndex((item) => item.id === e.target.parentElement.id);

      framesTwo.splice(index, 1);
      frames.splice(index, 1);
      frame.remove(e.target);
    };

    const frameCopyHandler = () => {
      frames.push({ dataURL, id });
      framesTwo.push({ imageData, id });
      framesWrapper.appendChild(createFrame(dataURL));
    };

    frameCopy.addEventListener('click', frameCopyHandler);
    frameDelete.addEventListener('click', frameDeleteHandler);

    fragment.appendChild(newFrame);
    return fragment;
  };

  const saveFrameHandler = () => {
    if (framesTwo.length !== 0) {
      imageData = ctx.getImageData(0, 0, width, height);
      dataURL = ctx.toDataURL();
    }
  }

  framesWrapper.appendChild(createFrame(dataURL));
  clear();

  saveFrameBtn.addEventListener('click', saveFrameHandler);
};

export default framesWorker;
