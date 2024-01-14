import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createFilterTemplate(isChecked) {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input
        id="filter-${FilterType.EVERYTHING}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        data-filter-type=""${FilterType.EVERYTHING}
        value="${FilterType.EVERYTHING}"
        ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${FilterType.EVERYTHING}">${FilterType.EVERYTHING}</label>
      </div>

      <div class="trip-filters__filter">
        <input
        id="filter-${FilterType.FUTURE}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        data-filter-type=""${FilterType.FUTURE}
        value="${FilterType.FUTURE}"
        ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${FilterType.FUTURE}">${FilterType.FUTURE}</label>
      </div>

      <div class="trip-filters__filter">
        <input
        id="filter-${FilterType.PRESENT}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        data-filter-type=""${FilterType.PRESENT}
        value="${FilterType.PRESENT}"
        ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${FilterType.PRESENT}">${FilterType.PRESENT}</label>
      </div>

      <div class="trip-filters__filter">
        <input
        id="filter-${FilterType.PAST}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        data-filter-type=""${FilterType.PAST}
        value="${FilterType.PAST}"
        ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${FilterType.PAST}">${FilterType.PAST}</label>
      </div>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #handleFilterTypeChange = null;

  constructor ({onFilterChange}) {
    super();
    this.#handleFilterTypeChange = onFilterChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate();
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);

  };
}
