export const pen = () => {
    const state = {
        painting: false,
        currentPenSize: 20,
        currentColor: 'black',
    };

    let { painting, currentColor, currentPenSize } = state;

    const canvas = document.querySelector('.canvas__field');
    const ctx = canvas.getContext('2d');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    const startPosition = (e) => {
        painting = true;
        draw(e);
    };

    const finishedPosition = () => {
        painting = false;
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!painting) return;

        ctx.lineCap = 'round';
        ctx.lineWidth = currentPenSize;
        ctx.strokeStyle = currentColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    };

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
};