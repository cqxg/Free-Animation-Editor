import { pen } from './tools/Pen';

const controller = () => {
    const tools = document.querySelector('.tools');
    const addFrameBtn = document.querySelector('.frames__add');

    const frames = [];
    const framesTwo = [];
    const framesWrapper = document.querySelector('.frames__template-wrapper');
    const frameTemplate = document.querySelector('.frame__template');

    const canvas = document.querySelector('.canvas__field');
    const ctx = canvas.getContext('2d');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    const toolIdentifier = (e) => {
        switch (e.target.className) {
            case 'pen':
                pen();
                e.target.classList.add('active')
                break;
            case 'line':
                console.log('u want line')
                break;
            case 'bucket':
                console.log('u want bucket')
                break;
            case 'eraser':
                console.log('u erase')
                break;
            case 'circle':
                console.log('u want circle')
                break;
            case 'rect':
                console.log('u want rect')
                break;
            case 'dropper':
                console.log('u want dropper')
                break;
            case 'mover':
                console.log('u want mover')
                break;
        }
    };

    const clear = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
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


        const frameDeleteHandler = (e) => {
            const elem = e.target;
            const num = (elem.classList.contains('frame__btn-delete')) ? elem.parentElement.id : elem.parentElement.parentElement.id;

            framesTwo.splice(num, 1);
            frames.splice(num, 1);
            frame.remove(e.target);
        }

        const frameCopyHandler = (e) => {
            const elem = e.target;
            const num = (elem.classList.contains('frame__btn-copy')) ? elem.parentElement.id : elem.parentElement.parentElement.id;
            frameDraw(num);
        }

        const frameDelete = newFrame.querySelector('.frame__btn-delete');
        frameDelete.addEventListener('click', frameDeleteHandler);

        const frameCopy = newFrame.querySelector('.frame__btn-copy');
        frameCopy.addEventListener('click', frameCopyHandler);

        fragment.appendChild(newFrame);
        return fragment;
    }

    const addFrame = () => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        framesTwo.push(imageData);

        const dataURL = canvas.toDataURL();
        frames.push(dataURL);

        const frameId = frames.length - 1;

        const fragment = createFrame({ url: dataURL, id: frameId });
        framesWrapper.appendChild(fragment);
        clear();
    };

    tools.addEventListener('click', (e) => toolIdentifier(e));
    addFrameBtn.addEventListener('click', (e) => addFrame(e));
};

document.addEventListener('DOMContentLoaded', controller);