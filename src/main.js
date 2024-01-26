import TripPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/button-new-event.js';
//import { generateFilter } from './mock/filter.js';
//import { generateSort } from './mock/filter.js';
//import { render } from './framework/render.js';
//import FilterView from './view/list-filter-view.js';
//import SortView from './view/list-sort-view.js';

//const siteHeader = document.querySelector('.page-header');
const listContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripListPresenter = new TripPresenter({
  listContainer,
  filterContainer,
  pointsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: listContainer,
  filterModel,
  pointsModel,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewTaskButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  tripListPresenter.createTask();
  newEventButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripListPresenter.init();
