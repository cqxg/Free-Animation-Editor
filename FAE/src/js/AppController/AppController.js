import AppView from '../AppView/AppView';
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
    this.transformControl = document.querySelector('.transform-tool');
    
    document.getElementById('get_color').addEventListener('change', e => this.view.changeColor(e));

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
  }
}

const controller = new AppController();
document.addEventListener('DOMContentLoaded', controller.init);
