const line = (canvas, ctx, color, lineWidth) => {
  
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  canvas.onmousedown = (e) => {
    canvas.onmousemove = (e) => {
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    canvas.onmouseup = () => {
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };
  };
};

export default line;
