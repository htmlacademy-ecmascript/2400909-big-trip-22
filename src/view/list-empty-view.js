import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PRESENT]: 'There are no points today',
  [FilterType.PAST]: 'There are no past points',
};

function createNoEventTemplate(filterType) {
  const noTaskTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
      ${noTaskTextValue}
    </p>`
  );
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
