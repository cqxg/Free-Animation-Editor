import AppView from '../AppView/AppView';
import rgb2hex from './functions';
import hexToRgb from './functions1';
import '../../css/style.css';

export default class AppController {
  constructor() {
    this.view = new AppView();
    this.dones = ['turn', 'clone', 'mirror', 'bucket-full', 'bucket', 'lighten', 'blackout', 'pipette', 'pen', 'line', 'eraser', 'rectngle', 'stroke-rectngle', 'circle', 'stroke-circle', 'play', 'stop', 'full', 'save', 'add', 'move', 'save_ses', 'addLayer'];
    this.do = 'pen';
    this.was = 'pen';
    this.tools = document.querySelector('.tools');
    this.player = document.querySelector('.play-wrapper');
    this.framsControl = document.querySelector('.button-wrapper');
    this.player = document.querySelector('.play-wrapper');
    this.transformControl = document.querySelector('.transform-tool');
    document.getElementById('get_color').addEventListener('change', e => this.view.changeColor(e));
    document.addEventListener('keypress', event => this.setTool(event));

    this.tools.addEventListener('click', (e) => {
      this.done(e);
      if (this.do === 'pen' || this.do === 'eraser' || this.do === 'line' || this.do === 'circle' || this.do === 'stroke-circle' || this.do === 'stroke-rectngle' || this.do === 'rectngle') {
        document.getElementById('range-wrapper').style.display = 'block';
        // eslint-disable-next-line no-shadow
        document.getElementById('width').addEventListener('change', e => this.view.changeWidth(e));
      } else {
        document.getElementById('range-wrapper').style.display = 'none';
      }
    });

    this.view.canvas.addEventListener('mousemove', (e) => {
      this.view.showCoordinates(e);
    });

    this.view.canvas.addEventListener('mouseout', () => {
      document.querySelector('.coordinates').innerHTML = '';
    });
  
    this.view.canvas.addEventListener('click', (e) => {
      if (this.do === 'bucket-full') this.view.bucketFull(hexToRgb(this.view.color));
      if (this.do === 'bucket') this.view.bucket(e, hexToRgb(this.view.color));
      if (this.do === 'eraser') this.view.down(e);
      if (this.do === 'line') this.view.upLine(e);
      if (this.do === 'pipette') {
        document.getElementById('get_color').value = rgb2hex(this.view.selectColor(e));
      }
    });

    this.view.canvas.addEventListener('mousedown', (e) => {
      if (this.do === 'pen') this.view.down(e);
      if (this.do === 'eraser') this.view.move(e, 'eraser');
      if (this.do === 'eraser') this.view.up();
      if (this.do === 'line') this.view.upLine(e);
    });

    this.view.canvas.addEventListener('mousemove', (e) => {
      if (this.do === 'pen') this.view.move(e);
    });

    this.view.canvas.addEventListener('mouseup', (e) => {
      if (this.do === 'pen') this.view.up();
    });

    this.player.addEventListener('click', (e) => {
      this.done(e);
      if (this.do === 'play') {
        this.view.playFrams();
        this.do = this.was;
        document.querySelector('.play').disabled = true;
      }
      if (this.do === 'stop') {
        document.querySelector('.play').disabled = false;
        this.do = this.was;
        this.view.stopPlay();
      }
      if (this.do === 'full') {
        this.do = this.was;
        this.view.fullScreen();
      }
    });
  }
  
  done(e) {
    const elem = (e.target.classList.contains('material-icons') || e.target.nodeName === 'IMG') ? e.target.parentElement.className : e.target.className;
    this.was = (this.do !== 'add' || this.do !== 'save' || this.do !== 'play' || this.do !== 'stop' || this.do !== 'full' || this.do !== 'clone' || this.do !== 'turn') ? this.do : this.was;
    this.do = (this.dones.indexOf(elem) !== -1) ? elem : 'pen';
  }

  setTool(event) {
    if (event.keyCode === 49) {
      this.do = 'pen';
    } else if (event.keyCode === 50) {
      this.do = 'line';
    } else if (event.keyCode === 51) {
      this.do = 'eraser';
    } else if (event.keyCode === 52) {
      this.do = 'bucket-full';
    } else if (event.keyCode === 53) {
      this.do = 'bucket';
    } else if (event.keyCode === 54) {
      this.do = 'pipette';
    } else if (event.keyCode === 55) {
      this.do = 'blackout';
    } else if (event.keyCode === 56) {
      this.do = 'lighten';
    } else if (event.keyCode === 57) {
      this.do = 'rectngle';
    } else if (event.keyCode === 58) {
      this.do = 'stroke-rectngle';
    }
  }

}

const controller = new AppController();
document.addEventListener('DOMContentLoaded', controller.init);
