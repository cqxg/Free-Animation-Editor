const circle = (canvas, ctx, color, lineWidth) => {
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
      const radius = ((a - x) ** 2 + (b - y) ** 2) ** 0.5;

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
