import AbstractView from '../framework/view/abstract-view';

function createButtonNewEventTemplate() {
  return (
    `<button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      disabled>
      New event
      </button>
    `
  );
}

export default class ButtonNewEvent extends AbstractView {
  get template() {
    return createButtonNewEventTemplate();
  }
}
