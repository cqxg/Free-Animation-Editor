const circle = (canvas, ctx, color, lineWidth) => {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;

    canvas.onmousedown = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        canvas.onmousemove = (e) => {
            const a = e.offsetX;
            const b = e.offsetY;
            const radius = Math.pow(Math.pow(a - x, 2) + Math.pow(b - y, 2), 0.5);

            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
        };

        canvas.onmouseup = () => {
            canvas.onmousemove = null;
            ctx.beginPath();
        };
    };
};

export default circle;