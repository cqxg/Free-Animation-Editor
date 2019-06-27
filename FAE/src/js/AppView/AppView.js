import AppModel from '../AppModel/AppModel';

export default class AppView {
  constructor() {
    this.canvas_cont = document.querySelector('.canvas');
    this.prevCanvas = document.getElementById('prevCanvas');
    this.canvas = document.getElementById('myCanvas');
    this.backgroundColor = document.getElementById('myColor');
    this.context = this.canvas.getContext('2d');
    this.width = 10;
    this.model = new AppModel();
  }

  // pen paint
  down(e) {
    this.paint = true;
    this.context.beginPath();
    const xCanvas = (e.pageX - this.canvas_cont.offsetLeft);
    const yCanvas = (e.pageY - this.canvas_cont.offsetTop);
    this.context.moveTo(xCanvas, yCanvas);
  }

  move(e, str = 'pen') {
    if (this.paint === true) {
      const xCanvas = e.pageX - this.canvas_cont.offsetLeft;
      const yCanvas = e.pageY - this.canvas_cont.offsetTop;
      this.context.lineTo(xCanvas, yCanvas);
      this.context.lineWidth = this.width;
      if (str === 'pen') this.context.strokeStyle = this.color;
      else this.context.globalCompositeOperation = 'destination-out';
      this.context.stroke();
    }
  }

  up() {
    this.paint = false;
    this.context.globalCompositeOperation = 'source-over';
  }
  //-------------------
  
  // color (change, select, bucket, fullbucket, transparency)
  changeColor(e) {
    this.color = e.target.value;
  }

  selectColor(e) {
    const xCanvas = e.pageX - this.canvas_cont.offsetLeft;
    const yCanvas = e.pageY - this.canvas_cont.offsetTop;
    this.color = `rgba(${this.context.getImageData(xCanvas, yCanvas, 1, 1).data.join(', ')})`;
    return this.context.getImageData(xCanvas, yCanvas, 1, 1).data;
  }

  bucketFull() {
    this.backgroundColor.style.backgroundColor = this.color;
    this.backroundcolor = this.backgroundColor.style.backgroundColor;
  }

  bucket(e, color_rgb = { b: 0, g: 0, r: 0 }) {
    const xCanvas = e.pageX - this.canvas_cont.offsetLeft;
    const yCanvas = e.pageY - this.canvas_cont.offsetTop;
    const c = this.context.getImageData(xCanvas, yCanvas, 1, 1).data;
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === c[0] && data[i + 1] === c[1] && data[i + 2] === c[2]) {
        data[i] = color_rgb.r;
        data[i + 1] = color_rgb.g;
        data[i + 2] = color_rgb.b;
      }
    }
    this.context.putImageData(imageData, 0, 0);
  }

}
