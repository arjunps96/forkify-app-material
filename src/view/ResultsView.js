import view from './Views.js';
import icons from 'url:../img/icons.svg';

if (module.hot) {
  module.hot.accept();
}
class resultView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'Sorry!No receipes found for your search';

  _generateMarkup() {
    return this._data.map(res => this._generateMarkupPreview(res));
  }
  _generateMarkupPreview(result) {
    const id = document.location.hash.slice(1);
    console.log(id);
    return `<li class="preview">
      <a class="preview__link" ${
        result.id === id ? 'preview__link--active' : ''
      } href='#${result.id}'>
        <figure class="preview__fig">
          <img src="${result.img}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated ${
            this._data.key ? '' : 'hidden'
          }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}
export default new resultView();
