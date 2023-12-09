import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

const POINTS_COUNT = 3;

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.listComponent, this.container);
    render(new SortView(), this.listComponent.getElement());
    render(new AddPointView(), this.listComponent.getElement());
    render(new EditPointView(), this.listComponent.getElement());


    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new ListView(), this.listComponent.getElement());
    }
  }
}
