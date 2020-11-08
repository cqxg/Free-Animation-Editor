const circle = (canvas, ctx, color, lineWidth) => {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;

    canvas.onmousedown = (event) => {
        const x = event.offsetX;
        const y = event.offsetY;

        canvas.onmousemove = (event) => {
            const a = event.offsetX;
            const b = event.offsetY;
            const radius = Math.pow(Math.pow(a - x, 2) + Math.pow(b - y, 2), 0.5);

            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
        }
        canvas.onmouseup = () => {
            canvas.onmousemove = null;
        }
    }
};

export default circle;