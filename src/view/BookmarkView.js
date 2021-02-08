import view from './Views.js';
import icons from 'url:../img/icons.svg';

if (module.hot) {
  module.hot.accept();
}
class BookmarkView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';

  _generateMarkup() {
    return this._data.map(res => this._generateMarkupPreview(res));
  }
  _generateMarkupPreview(result) {
    const id = document.location.hash.slice(1);
    //console.log(id);
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
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }

  addhandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
