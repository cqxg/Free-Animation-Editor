export const pen = (canvas, ctx) => {
    const state = {
        painting: false,
        currentPenSize: 20,
        currentColor: 'black',
    };

    let { painting, currentColor, currentPenSize } = state;

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

        ctx.lineCap = 'round';
        ctx.lineWidth = currentPenSize;
        ctx.strokeStyle = currentColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    };

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
};