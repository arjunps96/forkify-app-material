import view from './Views.js';
import icons from 'url:../img/icons.svg';
class PaginationView extends view {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numpage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //we are on 1stPage and other pages
    if (currentPage === 1 && numpage > 1)
      return `<button data-goto=${
        currentPage + 1
      } class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    if (currentPage === numpage && numpage > 1)
      return `<button data-goto=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;
    if (currentPage < numpage)
      return `
    <button data-goto=${
      currentPage + 1
    } class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      
  <button data-goto=${
    currentPage - 1
  } class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;

    return '';
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      //console.log(btnW);
      const gotoPage = +btn.dataset.goto;
      //console.log(gotoPage);
      handler(gotoPage);
      //handler();
      //console.log(gotoPage);
    });
  }
}
export default new PaginationView();
