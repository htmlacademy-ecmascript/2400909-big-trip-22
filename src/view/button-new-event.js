/* import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return (
    `<button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      disabled>
      New event
      </button>
    `
  );
} */

export default class NewEventButtonView {
  #handleClick = null;
  #element = null;

  constructor({onClick}) {
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get element() {
    if (!this.#element) {
      this.#element = document.querySelector('.trip-main__event-add-btn');
    }

    return this.#element;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
