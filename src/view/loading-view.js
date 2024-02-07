import AbstractView from '../framework/view/abstract-view.js';

function createLoadPointTemplate() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadPointTemplate();
  }
}
