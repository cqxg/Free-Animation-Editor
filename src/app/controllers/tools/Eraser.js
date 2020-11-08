const eraser = (canvas, ctx, lineWidth) => {
  let painting;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lineWidth;

  canvas.onmousedown = () => {
    painting = true;
    canvas.onmousemove = (event) => {
      if (!painting) return;

      ctx.fillRect(event.offsetX - lineWidth, event.offsetY - lineWidth, lineWidth, lineWidth);
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fill();
    };
    canvas.onmouseup = () => {
      painting = false;
      ctx.beginPath();
    };
  };
};

export default eraser;
