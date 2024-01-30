import TripPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/button-new-event.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic df56gdrg98jnobl';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const listContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const tripListPresenter = new TripPresenter({
  listContainer,
  pointsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer,
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
  tripListPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

//render(newEventButtonComponent, siteHeader);

filterPresenter.init();
tripListPresenter.init();
