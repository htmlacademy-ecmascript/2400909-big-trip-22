import { getRandomArrayElement } from '../utils.js';
import { TYPES } from '../const.js';

export const mockOffers = [
  {
    type: getRandomArrayElement(TYPES),
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPES),
    offers: [
      {
        id: 2,
        title: 'Swith to comfort class',
        price: 100
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPES),
    offers: [
      {
        id: 3,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPES),
    offers: [
      {
        id: 4,
        title: 'Add meal',
        price: 15
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPES),
    offers: []
  }
];

export function getRandomOffer() {
  return getRandomArrayElement(mockOffers);
}
