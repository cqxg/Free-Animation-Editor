const rectangle = (canvas, ctx, color, lineWidth, width, height) => {
  let painting;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth / 10;

  canvas.onmousedown = (e) => {
    painting = true;

    const x = e.offsetX;
    const y = e.offsetY;

    canvas.onmousemove = (e) => {
      if (!painting) return;

      const a = e.offsetX;
      const b = e.offsetY;

      ctx.rect(x, y, a - x, b - y);
      ctx.stroke();
      ctx.beginPath();
    };

    canvas.onmouseup = () => {
      painting = false;
      ctx.closePath();
    };
  };
};

export default rectangle;
