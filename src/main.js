import BoardPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';

const listContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const boardListPresenter = new BoardPresenter({listContainer, filterContainer, pointsModel});

boardListPresenter.init();
