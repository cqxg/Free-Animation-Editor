import { pen } from './tools/Pen';
import { framesWorker } from './tools/FramesWorker';

const controller = () => {
    let myAnimation;
    const frames = [];
    const framesTwo = [];
    const stop = document.querySelector('.stop');
    const play = document.querySelector('.play');
    const tools = document.querySelector('.tools');
    const fps = document.getElementById('animation__speed');
    const canvas = document.querySelector('.canvas__field');
    const addFrameBtn = document.querySelector('.frames__add');

    const state = {
        speed: 1,
    };

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

    const drawing = (i) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(framesTwo[i], 0, 0);
    };

    const playHandler = () => {
        let i = 0;
        state.speed = fps.valueAsNumber * 10;

        if (framesTwo.length !== 0) {
            myAnimation = setInterval(() => {
                drawing(i);
                if (i >= framesTwo.length - 1) i = 0;
                else i += 1;
            }, state.speed);
        };

        play.disabled = true;
    };

    const stopHandler = () => {
        clearInterval(myAnimation);
        play.disabled = false;
    };

    play.addEventListener('click', playHandler);
    stop.addEventListener('click', stopHandler);
    tools.addEventListener('click', (e) => toolIdentifier(e));
    addFrameBtn.addEventListener('click', (e) => framesWorker(canvas, ctx, frames, framesTwo));
};

document.addEventListener('DOMContentLoaded', controller);