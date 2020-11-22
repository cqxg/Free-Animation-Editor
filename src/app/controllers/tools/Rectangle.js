const rectangle = (canvas, ctx, color, lineWidth, width, height) => {

  canvas.onmousedown = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    canvas.onmousemove = (e) => {
      const a = e.offsetX;
      const b = e.offsetY;

      ctx.rect(x, y, a - x, b - y);
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = color;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.stroke();

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(canvas, 0, 0);
    };

    canvas.onmouseup = () => {
      canvas.onmousemove = null;
      ctx.closePath();
    };
  };
};

export default rectangle;
