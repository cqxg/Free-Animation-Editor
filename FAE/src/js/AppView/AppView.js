import AppModel from '../AppModel/AppModel';

export default class AppView {
  constructor() {
    this.canvas_cont = document.querySelector('.canvas');
    this.prevCanvas = document.getElementById('prevCanvas');
    this.canvas = document.getElementById('myCanvas');
    this.backgroundColor = document.getElementById('myColor');
    this.context = this.canvas.getContext('2d');
    this.paint = false;
    this.color = 'black';
    this.backroundcolor = 'white';
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

  //-------------

  clear() {
    this.backroundcolor = 'white';
    this.backgroundColor.style.backgroundColor = this.backroundcolor;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

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
  //---------------------------

  // frams
  frameDraw(x = 1000) {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const dataURL = this.canvas.toDataURL();
    const date = this.model.frameDraw(x, imageData, this.backroundcolor, dataURL);
    this.createFrame(date);
    this.clear();
    document.querySelector('.lyers-wrapper').innerHTML = '';
    this.drawLayer(0);
    this.active_num = this.model.framesTwo.length - 1;
  }

  createFrame(obj = {}) {
    const newFrame = document.importNode(this.model.frameTemplate.content, true);
    const frame = newFrame.querySelector('.frame');
    frame.id = `${obj.id}`;
    frame.style.backgroundColor = this.model.frames[obj.id].background;
    let url = '';
    for (let i = 0; i < this.model.frames[obj.id].data.length; i += 1) {
      url += `url(${this.model.frames[obj.id].data[i]}),`;
    }
    url = url.slice(0, url.length - 2);
    frame.style.backgroundImage = `${url}`;
    const fragment = document.createDocumentFragment();
    const frameDelete = newFrame.querySelector('.button-delete');
    frameDelete.addEventListener('click', e => this.frameDeleteHandler(e));
    const frameCopy = newFrame.querySelector('.button-copy');
    frameCopy.addEventListener('click', e => this.frameCopyHandler(e));
    fragment.appendChild(newFrame);
    this.model.framesWrapper.appendChild(fragment);
  }

  frameDeleteHandler(e) {
    const elem = e.target;
    const num = (elem.classList.contains('button-delete')) ? elem.parentElement.id : elem.parentElement.parentElement.id;
    this.model.frameDeleteHandler(num);
    this.refactior();
  }

  frameCopyHandler(e) {
    const elem = e.target;
    const num = (elem.classList.contains('button-copy')) ? elem.parentElement.id : elem.parentElement.parentElement.id;
    this.frameDraw(num);
    this.refactiorLayers(num);
    this.goToTheFram(this.active_num);
  }

  saveFrame() {
    if (this.model.framesTwo.length !== 0) {
      const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const dataURL = this.canvas.toDataURL();
      this.model.saveFrameLayer(this.active_num, this.active_layer, imageData, this.backroundcolor, dataURL);
      this.refactior();
    }
  }

  drawing(i = 0, layer = 0) {
    this.clear();
    this.context.putImageData(this.model.framesTwo[i].img[layer], 0, 0);
    this.backgroundColor.style.backgroundColor = this.model.framesTwo[i].background;
    this.backroundcolor = this.model.framesTwo[i].background;
  }

  goToTheFram(num) {
    this.active_num = num;
    this.drawing(num, 0);
    this.refactiorLayers(num);
  }

  refactior() {
    this.model.framesWrapper.innerHTML = '';
    this.model.frames.forEach((elem, index) => {
      this.createFrame({ url: elem, id: index });
    });
  }
  //----------------------
}
