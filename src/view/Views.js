import icons from 'url:../img/icons.svg';
class View {
  _data;
  _message = 'Your Recipe has been added successfully';
  render(data) {
    this._data = data;
    //console.log(this._data);
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErorrMessage();
    }
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    //console.log(this._data);

    const newMarkup = this._generateMarkup();
    //console.log(newMarkup);

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currElement = Array.from(this._parentEl.querySelectorAll('*'));
    newElement.forEach((newEl, i) => {
      const curEl = currElement[i];
      //console.log(newEl.firstChild);
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderErorrMessage(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  showSpinner = function () {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  _clear() {
    this._parentEl.innerHTML = '';
  }
}

export default View;
