import BoardPresenter from './presenter/trip-list-presenter.js';
import FilterView from './view/list-filter-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pointContainerElement = pageMainElement.querySelector('.trip-events');

const boardListPresenter = new BoardPresenter({container: pointContainerElement});

render(new FilterView(), filterContainerElement);

boardListPresenter.init();
