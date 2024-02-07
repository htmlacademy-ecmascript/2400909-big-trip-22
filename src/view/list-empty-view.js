import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events today',
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
