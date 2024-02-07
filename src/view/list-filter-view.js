import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      data-filter-type=""${type}
      value="${type}"
      ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled="disabled"' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>
    `
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
