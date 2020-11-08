const circle = (canvas, ctx, color, lineWidth) => {
    let painting;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    canvas.onmousedown = (e) => {
        painting = true;

        const x = e.offsetX;
        const y = e.offsetY;

        canvas.onmousemove = (e) => {
            if (!painting) return;

            const a = e.offsetX;
            const b = e.offsetY;
            const radius = Math.pow(Math.pow(a - x, 2) + Math.pow(b - y, 2), 0.5);

            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
        };

        canvas.onmouseup = () => {
            painting = false;
            ctx.beginPath();
        };
    };
};

export default circle;