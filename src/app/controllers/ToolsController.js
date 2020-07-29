const controller = () => {
    const tools = document.querySelector('.tools');
    const canvas = document.querySelector('.canvas__field');
    const ctx = canvas.getContext('2d');

    // resizing canvas.height / width
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    // const state = {
    //     painting: false,
    //     currentTool: '',
    //     currentColor: '',
    // };

    let painting;

    // let { painting, currentTool, currentColor } = state;

    // const toolIdentifier = (e) => {
    //     currentTool = e.target.className;
    //     switch (currentTool) {
    //         case 'pen':
    //             console.log('u want pen')
    //             break;
    //         case 'line':
    //             console.log('u want line')
    //             break;
    //         case 'bucket':
    //             console.log('u want bucket')
    //             break;
    //         case 'eraser':
    //             console.log('u erase')
    //             break;
    //         case 'circle':
    //             console.log('u want circle')
    //             break;
    //         case 'rect':
    //             console.log('u want rect')
    //             break;
    //         case 'dropper':
    //             console.log('u want dropper')
    //             break;
    //         case 'mover':
    //             console.log('u want mover')
    //             break;
    //     }
    // };

    const startPosition = (e) => {
        painting = true;
        draw(e);
    };

    const finishedPosition = () => {
        painting = false;
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!painting) return;

        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'red';
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY)
    };

    // tools.addEventListener('click', (e) => toolIdentifier(e));
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mousedown', finishedPosition);
    canvas.addEventListener('mousemove', draw);

};

document.addEventListener('DOMContentLoaded', controller);