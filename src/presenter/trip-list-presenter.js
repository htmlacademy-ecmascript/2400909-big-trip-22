import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import NoEventView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import PointPresenter from './point-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { FilterType, SortType, UserAction, UpdateType } from '../const.js';
import { filter, sortByDate, sortByPrice, sortByTime } from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #listComponent = new ListView();
  #sortComponent = null;
  #noEventComponent = null;
  #loadingComponent = new LoadingView();

  #offersList = [];
  #destinationsList = [];
  #pointPresenter = new Map();
  #newEventPresenter = null;
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({listContainer, pointsModel, filterModel, onNewEventDestroy}) {
    this.#listContainer = listContainer;
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
      case SortType.DAY:
        return filteredPoints.sort(sortByDate('dateFrom'));
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  init() {
    this.#offersList = [...this.#pointsModel.offers];
    this.#destinationsList = [...this.#pointsModel.destinations];

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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
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

  #renderError() {
    render(new ErrorView(), this.#listComponent.element, RenderPosition.AFTERBEGIN);
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
    this.#newEventPresenter.destroy();

    remove(this.#sortComponent);
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

    if (this.#pointsModel.isError) {
      this.#renderError();
      return;
    }

    //условие отрисовки заглушки при остутствии точек маршрута
    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
