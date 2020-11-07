const line = (canvas, ctx, color, lineWidth) => {
  let painting;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  const draw = (e, xCanvas) => {
    if (!painting) return;

    ctx.moveTo(xCanvas, e.clientY - canvas.offsetTop);
  };

  const startPosition = (e) => {
    painting = true;
    const xCanvas = e.clientX - canvas.offsetLeft;

    draw(e, xCanvas);
  };

  const finishedPosition = (e) => {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  };

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
};

export default line;
