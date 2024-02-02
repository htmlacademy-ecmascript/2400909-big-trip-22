import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
//import NewEventButtonView from '../view/button-new-event.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import NoEventView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { FilterType, SortType, UserAction, UpdateType } from '../const.js';
import { filter, sortByPrice, sortByTime } from '../utils/filter.js';
//import EditPointView from '../view/edit-point-view.js';
//import FilterView from '../view/list-filter-view.js';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;
  //#filterContainer = null;
  #listComponent = new ListView();
  //#filterComponent = null;
  #sortComponent = null;
  //#buttonNewPoint = new NewEventButtonView();
  #noEventComponent = null;
  #loadingComponent = new LoadingView();
  //#pointEdit = null;

  //#boardPoints = [];
  #offersList = [];
  #destinationsList = [];
  #pointPresenter = new Map();
  #newEventPresenter = null;
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #isLoading = true;
  //#sourcedBoardPoints = [];

  constructor({listContainer, pointsModel, filterModel, onNewEventDestroy}) {
    this.#listContainer = listContainer;
    //this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  init() {
    //this.#boardPoints = [...this.#pointsModel.points];
    this.#offersList = [...this.#pointsModel.offers];
    this.#destinationsList = [...this.#pointsModel.destinations];
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    //this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.#offersList, this.#destinationsList);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderPoint (point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    // - сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    // - очищаем список
    this.#clearBoard();
    this.#renderBoard();
    this.#removeSort();
    this.#renderSort();
  };

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange, currentSortType: this.#currentSortType});
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #removeSort() {
    remove(this.#sortComponent);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point, this.#offersList, this.#destinationsList));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    //remove(this.#noEventComponent);
    remove(this.#loadingComponent);

    if(this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    render(this.#listComponent, this.#listContainer);

    //отрисовка заглушки при загрузки данных с сервера
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    //условие отрисовки заглушки при остутствии точек маршрута
    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderPoints(); // TODO: замена на render(this.#taskListComponent, this.#boardComponent.element);
  }
}
