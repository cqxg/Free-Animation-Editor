export const framesWorker = (canvas, ctx, frames, framesTwo) => {
    const { width, height } = canvas;
    const dataURL = canvas.toDataURL();
    const imageData = ctx.getImageData(0, 0, width, height);

    const frameTemplate = document.querySelector('.frame__template');
    const framesWrapper = document.querySelector('.frames__template-wrapper');

    frames.push(dataURL);
    framesTwo.push(imageData);

    const clear = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
    };

    const createFrame = (dataURL) => {
        const fragment = document.createDocumentFragment();
        const newFrame = document.importNode(frameTemplate.content, true);

        const frame = newFrame.querySelector('.frame');
        const frameImage = newFrame.querySelector('.frame__image');
        const frameCopy = newFrame.querySelector('.frame__btn-copy');
        const frameDelete = newFrame.querySelector('.frame__btn-delete');

        frameImage.src = dataURL;

        const frameDeleteHandler = (e) => frame.remove(e.target);
        const frameCopyHandler = () => framesWrapper.appendChild(createFrame(dataURL));

        frameCopy.addEventListener('click', frameCopyHandler);
        frameDelete.addEventListener('click', frameDeleteHandler);

        fragment.appendChild(newFrame);
        return fragment;
    }

    framesWrapper.appendChild(createFrame(dataURL));
    clear();
};