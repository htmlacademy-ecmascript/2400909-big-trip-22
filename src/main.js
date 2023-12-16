import BoardPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';

const pointContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const boardListPresenter = new BoardPresenter(
  {
    pointContainerElement,
    filterContainerElement,
    pointsModel
  }
);

boardListPresenter.init();
