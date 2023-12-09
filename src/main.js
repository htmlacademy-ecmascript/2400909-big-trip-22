import FilterView from './view/list-filter-view.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.main');

render(new FilterView(), siteMainElement);
