const circle = (canvas, ctx, color, lineWidth) => {

    canvas.onmousedown = (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        canvas.onmousemove = (event) => {
            const a = event.offsetX;
            const b = event.offsetY;
            var radius = Math.pow(Math.pow(a - x, 2) + Math.pow(b - y, 2), 0.5);
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.stroke();
        }
        canvas.onmouseup = () => {
            canvas.onmousemove = null;
        }
    }

    canvas.onmouseup = () => {
        isMouseDown = false;
    }
};

export default circle;