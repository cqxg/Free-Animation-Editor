export default class AppModel {
  constructor() {
    this.frames = [];
    this.framesTwo = [];
    this.framesWrapper = document.querySelector('.frames-wrapper');
    this.frameTemplate = document.querySelector('#frame-template');
  }

  frameDraw(x = 1000, image, backgroundColor, data) {
    let imageData = [];
    let dataURL = [];
    let background;
    if (x === 1000) {
      imageData.push(image);
      background = backgroundColor;
      dataURL.push(data);
    } else {
      imageData = this.framesTwo[x].img.slice();
      // eslint-disable-next-line prefer-destructuring
      background = this.framesTwo[x].background;
      dataURL = this.frames[x].data.slice();
    }
    this.framesTwo.push({ img: imageData, background });
    this.frames.push({ data: dataURL, background });
    return { url: dataURL, id: this.frames.length - 1 };
  }

  frameDeleteHandler(num) {
    this.framesTwo.splice(num, 1);
    this.frames.splice(num, 1);
  }

  cloneFram(num) {
    const len = this.framesTwo.length;
    for (let i = 0; i < len; i += 1) {
      const imageObj = {};
      const dataObj = {};
      Object.assign(imageObj, this.framesTwo[num]);
      Object.assign(dataObj, this.frames[num]);
      this.framesTwo[i] = imageObj;
      this.frames[i] = dataObj;
    }
  }
}
