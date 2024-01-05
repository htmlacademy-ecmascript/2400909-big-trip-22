import { render, replace } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

export default class PointPresenter {
  #listContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;

  constructor({listContainer}) {
    this.#listContainer = listContainer;
  }

  init(point, offers) {
    this.#point = point;
    this.#offers = offers;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    render(this.#pointComponent, this.#listContainer);
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

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

}
