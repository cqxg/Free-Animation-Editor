const framesWorker = (params) => {
  const { canvas, ctx, frames, framesTwo, width, height } = params;

  let dataURL = canvas.toDataURL();
  let imageData = ctx.getImageData(0, 0, width, height);

  const id = frames.length + Math.random().toString(16).slice(2);
  const frameTemplate = document.querySelector('.frame__template');
  const framesWrapper = document.querySelector('.frames__template-wrapper');

  let prevId;

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

  const goToFrame = (e) => {
    if (e.target.classList.contains('frame__btn-copy') || e.target.classList.contains('frame__btn-delete')) return null;
    const currItem = framesTwo.filter((item) => item.id === e.target.parentElement.id);
    prevId = currItem[0].id;

    return ctx.putImageData(currItem[0].imageData, 0, 0);
  };

  framesWrapper.appendChild(createFrame(dataURL));
  clear();

  framesWrapper.addEventListener('click', goToFrame);
};

export default framesWorker;
