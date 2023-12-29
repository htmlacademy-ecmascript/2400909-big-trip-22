import FilterView from '../view/list-filter-view.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

//const POINTS_COUNT = 3; заменили на this.boardPoints.length

export default class BoardPresenter {
  #listContainer = null;
  #filterContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();

  #boardPoints = [];
  #offersList = [];

  constructor({listContainer, filterContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#offersList = [...this.#pointsModel.offers];

    render(new SortView(), this.#listContainer);
    render(new FilterView(), this.#filterContainer);
    render(this.#listComponent, this.#listContainer);
    render(new EditPointView({point: this.#boardPoints[0], offers: this.#offersList}), this.#listComponent.element);


    for (let i = 1; i < this.#boardPoints.length; i++) {
      const offersForPoint = this.#offersList.find((offer) => offer.type === this.#boardPoints[i].type).offers;
      render(this.#renderPoint({point: this.#boardPoints[i], offers: offersForPoint}));
    }
  }

  #renderPoint (point, offers) {
    const pointComponent = new PointView({point, offers});

    render(pointComponent, this.#listComponent.element);

  }
}
