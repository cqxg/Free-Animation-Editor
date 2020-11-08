const pen = (canvas, ctx, color, lineWidth) => {
  let painting;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  canvas.onmousedown = (e) => {
    painting = true;

    canvas.onmousemove = (e) => {
      if (!painting) return;

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    canvas.onmouseup = () => {
      painting = false;
      ctx.beginPath();
    };
  };
};

export default pen;
