const line = (canvas, ctx, color, lineWidth) => {
  const startPosition = (e) => {
    const xCanvas = e.clientX - canvas.offsetLeft;
    const yCanvas = e.clientY - canvas.offsetTop;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.lineTo(xCanvas, yCanvas);
    ctx.stroke();
  };

  canvas.addEventListener('mousedown', startPosition);
};

export default line;
