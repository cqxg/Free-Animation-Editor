const pen = (canvas, ctx, color) => {
  const state = {
    painting: false,
    currentPenSize: 20,
    currentColor: color,
  };

  let { painting, currentColor, currentPenSize } = state;

  const draw = (e) => {
    if (!painting) return;
    console.log(state.currentColor)

    ctx.lineCap = 'round';
    ctx.lineWidth = currentPenSize;
    ctx.strokeStyle = currentColor;

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

export default pen;
