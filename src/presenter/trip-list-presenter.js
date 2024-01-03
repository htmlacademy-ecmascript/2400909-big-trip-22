import FilterView from '../view/list-filter-view.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ButtonNewEvent from '../view/button-new-event.js';
import { render, replace, RenderPosition, remove} from '../framework/render.js';
import NoEventView from '../view/list-empty-view.js';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterContainer = null;
  #listComponent = new ListView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();
  #buttonNewPoint = new ButtonNewEvent();
  #noEventComponent = new NoEventView();
  #pointEdit = new EditPointView();

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

    this.#renderBoard();
  }

  #renderPoint (point, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }

  #renderSort() {
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

  #renderFilters() {
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
