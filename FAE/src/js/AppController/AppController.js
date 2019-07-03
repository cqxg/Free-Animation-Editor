
export default class AppController {
  constructor() {
    this.tools = document.querySelector('.tools');
    this.player = document.querySelector('.play-wrapper');
    this.framsControl = document.querySelector('.button-wrapper');
    this.transformControl = document.querySelector('.transform-tool');
  }
}

const controller = new AppController();
document.addEventListener('DOMContentLoaded', controller.init);
