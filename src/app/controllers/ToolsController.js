import { pen } from './tools/Pen';
import { framesWorker } from './tools/FramesWorker';

const controller = () => {
    const tools = document.querySelector('.tools');
    const canvas = document.querySelector('.canvas__field');
    const addFrameBtn = document.querySelector('.frames__add');

    const ctx = canvas.getContext('2d');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    const toolIdentifier = (e) => {
        switch (e.target.className) {
            case 'pen':
                pen(canvas, ctx);
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

    tools.addEventListener('click', (e) => toolIdentifier(e));
    addFrameBtn.addEventListener('click', (e) => framesWorker(canvas, ctx));
};

document.addEventListener('DOMContentLoaded', controller);