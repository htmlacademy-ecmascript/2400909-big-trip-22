import FilterView from '../view/list-filter-view.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

//const POINTS_COUNT = 3; заменили на this.boardPoints.length

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({listContainer, filterContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.listContainer);
    render(new FilterView(), this.filterContainer);
    render(this.listComponent, this.listContainer);
    render(new EditPointView(), this.listComponent.getElement());


    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({task: this.boardPoints[i]}), this.listComponent.getElement());
    }
  }
}
