import BoardPresenter from './presenter/trip-list-presenter.js';

const pointContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');

const boardListPresenter = new BoardPresenter(pointContainerElement, filterContainerElement);

boardListPresenter.init();
