import FilterView from '../view/list-filter-view.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import ButtonNewEvent from '../view/button-new-event.js';
import { render, RenderPosition } from '../framework/render.js';
import NoEventView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import EditPointView from '../view/edit-point-view.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterContainer = null;
  #listComponent = new ListView();
  #filterComponent = null;
  #sortComponent = null;
  #buttonNewPoint = new ButtonNewEvent();
  #noEventComponent = new NoEventView();
  #pointEdit = new EditPointView();

  #boardPoints = [];
  #offersList = [];
  #pointPresenter = new PointPresenter();

  constructor({listContainer, filterContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#offersList = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint (point, offers) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#listComponent.elememt,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, offers);
    this.#pointPresenter.set(point.id, offers.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    // - сортируем задачи
    // - очищаем список
    // - рендерим список заново
  }

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((point, offers) => this.#renderPoint(point, offers));
  }

  #renderNoEvents() {
    render(this.#noEventComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleFilterTypeChange = (filterType) => {
    // - сортируем задачи
    // - очищаем список
    // - рендерим список заново
  }

  #renderFilters() {
    this.#filterComponent = new FilterView({onFilterChange: this.#handleFilterTypeChange});
    render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
  }

  #renderButtonNewPoint() {
    render(this.#buttonNewPoint, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEditPoint() {
    render(this.#pointEdit({point: this.#boardPoints[0], offers: this.#offersList}), this.#listComponent.element);

    for (let i = 1; i < this.#boardPoints.length; i++) {
      const offersForPoint = this.#offersList.find((offer) => offer.type === this.#boardPoints[i].type).offers;
      render(this.#renderPoint({point: this.#boardPoints[i], offers: offersForPoint}));
    }
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderBoard() {
    render(this.#listComponent, this.#listContainer);

    //условие отрисовки заглушки при остутствии точек маршрута
    if (this.#boardPoints.every((point) => point.isArchive)) {
      this.#renderNoEvents();

      return;
    }

    this.#renderSort();
    this.#renderFilters();
    this.#renderEditPoint();
    this.#renderPoints();
    this.#renderEditPoint();
    this.#renderButtonNewPoint();
  }
}
