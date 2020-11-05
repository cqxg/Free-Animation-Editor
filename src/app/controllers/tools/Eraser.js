const eraser = (canvas, ctx, lineWidth) => {

    let painting;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = 'destination-out';

    const draw = (e) => {
        if (!painting) return;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    const startPosition = (e) => {
        painting = true;
        draw(e);
    };

    const finishedPosition = () => {
        painting = false;
        ctx.beginPath();
    };

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
};

export default eraser;
