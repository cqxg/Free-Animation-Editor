export const framesWorker = (canvas, ctx) => {
    console.log('qq')
    const frame = document.querySelector('.frame');
    const frameTemplate = document.querySelector('.frame__template');
    const framesWrapper = document.querySelector('.frames__template-wrapper');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const frames = [];
    const framesTwo = [];
    const dataURL = canvas.toDataURL();

    frames.push(dataURL);
    framesTwo.push(imageData);

    const frameId = frames.length - 1;

    const clear = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const createFrame = (frameParams) => {
        const { url, id } = frameParams;

        const fragment = document.createDocumentFragment();

        const newFrame = document.importNode(frameTemplate.content, true);

        const frameImage = newFrame.querySelector('.frame__image');
        const frame = newFrame.querySelector('.frame');
        frame.id = `${id}`;
        frameImage.src = url;
        frameImage.id = `${id}`;

        const frameDelete = newFrame.querySelector('.frame__btn-delete');
        frameDelete.addEventListener('click', frameDeleteHandler);

        const frameCopy = newFrame.querySelector('.frame__btn-copy');
        frameCopy.addEventListener('click', frameCopyHandler);

        fragment.appendChild(newFrame);
        return fragment;
    }

    const frameDeleteHandler = (e) => {
        const elem = e.target;
        const num = (elem.classList.contains('frame__btn-delete')) ? elem.parentElement.id : elem.parentElement.parentElement.id;

        framesTwo.splice(num, 1);
        frames.splice(num, 1);
        frame.remove(e.target);
    }

    const frameCopyHandler = (e) => {
        const num = (e.target.classList.contains('frame__btn-copy')) ? e.target.parentElement.id : e.target.parentElement.parentElement.id;
        const imageData = framesTwo[num];
        const dataURL = frames[num];

        framesTwo.push(imageData);
        frames.push(dataURL);

        const frameId = frames.length - 1;

        const fragment = createFrame({ url: dataURL, id: frameId });
        framesWrapper.appendChild(fragment);
        clear();
    }

    const fragment = createFrame({ url: dataURL, id: frameId });

    framesWrapper.appendChild(fragment);
    clear();
};