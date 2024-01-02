import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sort, isChecked) {
  const {type} = sort;

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}" ${isChecked ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate(sortItems) {
  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItemTemplate(sort, index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sorts = null;

  constructor ({sortItems}) {
    super();
    this.#sorts = sortItems;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
