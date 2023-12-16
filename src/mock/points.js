import { TYPES } from '../const.js';
import { getRandomArrayElement } from '../utils.js';
import { getRandomDestination } from './destinations.js';
import { humanizePointDate } from '../utils.js';

export const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: humanizePointDate('2019-07-10T22:55:56.845Z'),
    dateTo: humanizePointDate('2019-07-11T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1, 2, 3, 4, 5],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 2,
    basePrice: 1700,
    dateFrom: humanizePointDate('2019-08-11T22:55:56.845Z'),
    dateTo: humanizePointDate('2019-08-19T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1, 2, 3, 4],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 3,
    basePrice: 700,
    dateFrom: humanizePointDate('2019-09-09T22:55:56.845Z'),
    dateTo: humanizePointDate('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1, 2, 3],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 4,
    basePrice: 2100,
    dateFrom: humanizePointDate('2019-09-09T22:55:56.845Z'),
    dateTo: humanizePointDate('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1, 2],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 5,
    basePrice: 900,
    dateFrom: humanizePointDate('2019-09-09T22:55:56.845Z'),
    dateTo: humanizePointDate('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(TYPES)
  }
];

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

