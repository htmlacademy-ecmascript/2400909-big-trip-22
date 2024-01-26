import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate(isChecked) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
        <input id="sort-${SortType.DAY}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        data-sort-type="${SortType.DAY}"
        value="sort-${SortType.DAY}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.DAY}">${SortType.DAY}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
        <input id="sort-${SortType.EVENT}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        data-sort-type="${SortType.EVENT}"
        value="sort-${SortType.EVENT}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.EVENT}">${SortType.EVENT}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
        <input id="sort-${SortType.TIME}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        data-sort-type="${SortType.TIME}"
        value="sort-${SortType.TIME}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.TIME}">${SortType.TIME}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
        <input id="sort-${SortType.PRICE}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        data-sort-type="${SortType.PRICE}"
        value="sort-${SortType.PRICE}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.PRICE}">${SortType.PRICE}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
        <input id="sort-${SortType.OFFERS}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        data-sort-type="${SortType.OFFERS}"
        value="sort-${SortType.OFFERS}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">${SortType.OFFERS}</label>
      </div>
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor ({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };
}
