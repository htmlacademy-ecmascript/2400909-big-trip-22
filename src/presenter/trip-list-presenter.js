import FilterView from '../view/list-filter-view.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

const POINTS_COUNT = 3;

export default class BoardPresenter {
  listComponent = new ListView();

  constructor(listContainer, filterContainer) {
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(new FilterView(), this.filterContainer);
    render(this.listComponent, this.listContainer);
    render(new EditPointView(), this.listComponent.getElement());


    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
