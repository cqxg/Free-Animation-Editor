const mover = (canvas, ctx) => {
  const form = {
    img: null,
    posX: 0,
    posY: 0,
  };

  let painting;

  canvas.onmousedown = (e) => {
    painting = true;
    const dataURL = canvas.toDataURL();

    form.img = new Image();
    form.img.src = dataURL;
    form.posX = e.pageX - canvas.offsetLeft;
    form.posY = e.pageY - canvas.offsetTop;
  };

  canvas.onmousemove = (e) => {
    if (!painting) return;

    ctx.fillStyle = 'rgba(255,255,255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const dx = e.pageX - canvas.offsetLeft - form.posX;
    const dy = e.pageY - canvas.offsetTop - form.posY;
    ctx.drawImage(form.img, dx, dy);
  };

  canvas.onmouseup = () => {
    painting = false;
    ctx.beginPath();
  };
};

export default mover;
