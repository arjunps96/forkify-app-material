import icons from 'url:../img/icons.svg';
import { Fraction } from 'fractional';
import View from './Views.js';

class AddReceipeView extends View {
  _parentEl = document.querySelector('.upload');

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnclose = document.querySelector('.btn--close-modal');
  _addReceipe = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addHandlerHideWindow();
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._addReceipe.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnclose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const ObjectJSON = Object.fromEntries(data);
      handler(ObjectJSON);
    });
  }
}

export default new AddReceipeView();
