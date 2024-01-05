import { getRandomArrayElement } from '../utils/common.js';
import { getRandomDestination } from './destinations.js';
import { nanoid } from 'nanoid';

export const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1, 2, 3],
    type: 'taxi'
  },
  {
    id: 2,
    basePrice: 1700,
    dateFrom: new Date('2019-08-11T22:55:56.845Z'),
    dateTo: new Date('2019-08-19T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [4, 5, 6],
    type: 'bus'
  },
  {
    id: 3,
    basePrice: 700,
    dateFrom: new Date('2019-09-09T22:55:56.845Z'),
    dateTo: new Date('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [7, 8, 9],
    type: 'train'
  },
  {
    id: 4,
    basePrice: 2100,
    dateFrom: new Date('2019-09-09T22:55:56.845Z'),
    dateTo: new Date('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [10, 11],
    type: 'ship'
  },
  {
    id: 5,
    basePrice: 900,
    dateFrom: new Date('2019-09-09T22:55:56.845Z'),
    dateTo: new Date('2019-09-15T11:22:13.375Z'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [],
    type: 'drive'
  }
];

export function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

