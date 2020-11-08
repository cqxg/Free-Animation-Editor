const line = (canvas, ctx, color, lineWidth) => {
  let painting;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  canvas.onmousedown = (e) => {
    painting = true;

    canvas.onmousemove = (event) => {
      if (!painting) return;

      ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    };

    canvas.onmouseup = () => {
      painting = false;
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
    };
  };
};

export default line;
