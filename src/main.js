import TripPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
//import { generateFilter } from './mock/filter.js';
//import { generateSort } from './mock/filter.js';
import { render } from './framework/render.js';
import FilterView from './view/list-filter-view.js';
//import SortView from './view/list-sort-view.js';

const filters = [
  {
    type: 'everything',
  },
];

const listContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripListPresenter = new TripPresenter({listContainer, filterContainer, pointsModel});

render(new FilterView({
  filters,
  currentFilterType: 'everything',
  onFilterChange: () => {}
}), listContainer);

tripListPresenter.init();
