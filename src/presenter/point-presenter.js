import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

export default class PointPresenter {
  #listContainer = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;

  constructor({listContainer, onDataChange}) {
    this.#listContainer = listContainer;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers) {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer);

      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#listContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

}
