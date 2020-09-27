import pen from './tools/Pen';
import framesWorker from './tools/FramesWorker';

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
    const colorSelector = document.querySelector('.color__selector');
    const previewMonitor = document.querySelector('.preview__monitor');
    const palette = document.getElementById('palette');

    let state = {
        speed: 1,
        color: ''
    };

    const ctx = canvas.getContext('2d');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    const animate = (i) => {
        let url = `url(${frames[i].dataURL}),`;
        url = url.slice(0, url.length - 2);
        previewMonitor.style.backgroundImage = url;
    };

    const playHandler = () => {
        let i = 0;
        state.speed = fps.valueAsNumber * 10;

        if (framesTwo.length > 1) {
            myAnimation = setInterval(() => {
                animate(i);
                if (i >= framesTwo.length - 1) i = 0;
                else i += 1;
            }, state.speed);
        }

        play.disabled = true;
    };

    const stopHandler = () => {
        clearInterval(myAnimation);
        play.disabled = false;
    };

    const setColorHandler = () => {
        state.color = colorSelector.value;
        pen(canvas, ctx, state.color);
    };

    const toolIdentifier = (e) => {
        switch (e.target.className) {
            case 'pen':
                pen(canvas, ctx, state.color);
                // e.target.classList.add('active');
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

    const generatePalette = (palette) => {
        // генерируем палитру
        // в итоге 5^3 цветов = 125
        for (var r = 0, max = 4; r <= max; r++) {
            for (var g = 0; g <= max; g++) {
                for (var b = 0; b <= max; b++) {
                    var paletteBlock = document.createElement('div');
                    paletteBlock.className = 'button';
                    paletteBlock.addEventListener('click', function changeColor(e) {
                        context.strokeStyle = e.target.style.backgroundColor;
                    });

                    paletteBlock.style.backgroundColor = (
                        'rgb(' + Math.round(r * 255 / max) + ", "
                        + Math.round(g * 255 / max) + ", "
                        + Math.round(b * 255 / max) + ")"
                    );

                    palette.appendChild(paletteBlock);
                }
            }
        }
    };

    generatePalette(palette);

    play.addEventListener('click', playHandler);
    stop.addEventListener('click', stopHandler);
    // colorSelector.addEventListener('input', setColorHandler);
    tools.addEventListener('click', (e) => toolIdentifier(e));
    addFrameBtn.addEventListener('click', () => framesWorker(canvas, ctx, frames, framesTwo));
};

document.addEventListener('DOMContentLoaded', controller);
