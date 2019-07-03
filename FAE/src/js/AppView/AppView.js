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


}
