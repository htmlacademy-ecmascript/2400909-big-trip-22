import { TYPES } from '../const.js';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

//функция для верхнего регистра первой буквы в названии типа
const upTitle = (title) => title[0].toUpperCase() + title.slice(1);

function createListDestinationsTemplate(destinations, id) {

  return (
    `<datalist id="destination-list-${id}">
        ${destinations.map((destination) => (
          `<option value="${destination.name}"></option>`
        )).join('')}
      </datalist>`
  );
}

function createTypeTemplate(point, currentDestination, destinations) {
  const {id, type} = point;
  const {name} = currentDestination || {name: ''};

  /* if (!currentDestination) {
    return '';
  } */

  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="${id}7" height="${id}7" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

       ${TYPES.map((eventType) => (
          `<div class="event__type-item">
          <input id="event-type-${eventType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
          <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${id}">${upTitle(eventType)}</label>
          </div>`
        )).join('')}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${upTitle(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination"
        value="${destinations ? name : ''}"
      list="destination-list-${id}">
      ${createListDestinationsTemplate(destinations, id)}
    </div>`
  );
}

function createDateTemplate(point) {
  const {dateFrom, dateTo, id} = point;

  return (
    `
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY h:mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY h:mm')}">
    `
  );
}

function createPriceTemplate(point) {
  const {basePrice, id} = point;

  return (
    `
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
    `
  );
}

function createSaveButton() {
  return (
    '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>'
  );
}

function createResetButton(pointId) {
  return (
    `<button class="event__reset-btn" type="reset">${pointId === 0 ? 'Cancel' : 'Delete'}</button>`
  );
}

function createRollupButton(pointId) {
  if (pointId === 0) {
    return '';
  }

  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createOfferTemplate(point, offersByType) {
  const pointTypeOffer = offersByType.find((offer) => offer.type === point.type);

  if (pointTypeOffer.length !== 0) {
    return (
      `<div class="event__available-offers">
        ${pointTypeOffer.offers.map((offer) => {
          const checked = point.offers.includes(offer.id) ? 'checked' : '';

          return (
            `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${checked}>
              <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
                <span class="event__offer-title">${upTitle(offer.title)}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`
          );
        }).join('')
        }
      </div>`
    );
  }

  return '';
}

function createDestinationTemplate(currentDestination) {
  const {description, pictures} = currentDestination || {};

  if (!currentDestination || pictures.length === 0) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
          </div>
        </div>
    </section>`
  );
}

function createEditPointTemplate(point, offersByType, destinations) {
  const currentDestination = destinations.find((dest) => dest.id === point.destination);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeTemplate(point, currentDestination, destinations)}

        <div class="event__field-group  event__field-group--time">
          ${createDateTemplate(point)}
        </div>

        <div class="event__field-group  event__field-group--price">
         ${createPriceTemplate(point)}
        </div>

        ${createSaveButton()}
        ${createResetButton(point.id)}
        ${createRollupButton(point.id)}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${createOfferTemplate(point, offersByType)}
        </section>

           ${currentDestination ? createDestinationTemplate(currentDestination) : ''}

      </section>
    </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleViewClick = null;
  #handleDeleteClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #offersByType = null;
  #destinations = null;

  constructor ({point, offersByType, destinations, onFormSubmit, onViewClick, onDeleteClick}) {
    super();
    this.#offersByType = offersByType;
    this.#destinations = destinations;

    this._setState(EditPointView.parsePointToState({point}));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleViewClick = onViewClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state.point, this.#offersByType, this.#destinations);
  }

  //перегружаем метод родителя removeElement
  //чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if(this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if(this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  //HANDLERS
  _restoreHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHadler);
    this.element.querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteHadler);

    this.#setDatepickers();
  };

  #formSubmitHadler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteHadler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleViewClick();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((dest) => dest.name === evt.target.value);
    const selectedDestinationById = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationById}});
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({point: {...this._state.point, offers: checkedBoxes.map((element) => element.dataset.offersByType)}});
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({point: {...this._state.point, basePrice: evt.target.valueAsNumber}});
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateFrom: userDate}});
    this.#datePickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateTo: userDate}});
    this.#datePickerFrom.set('maxDate', this._state.point.dateTo);
  };

  //метод для создания календаря
  #setDatepickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24h': true,
    };

    this.#datePickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromCloseHandler, //на событие flapicker передаём наш колбэк
        maxDate: this._state.point.dateTo,
      }
    );

    this.#datePickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler, //на событие flapicker передаём наш колбэк
        minDate: this._state.point.dateFrom,
      }
    );
  }

  static parsePointToState = (point) => (point);

  static parseStateToPoint = (state) => state.point;
}
