import { getRandomArrayElement } from '../utils.js';
import { getRandomNumber } from '../utils.js';
import { TYPES } from '../const.js';

export const mockOffers = [
  {
    type: getRandomArrayElement(TYPES),
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: getRandomNumber()
      },
      {
        id: 2,
        title: 'Swith to comfort class',
        price: getRandomNumber()
      },
      {
        id: 3,
        title: 'Choose seats',
        price: getRandomNumber()
      },
      {
        id: 4,
        title: 'Add meal',
        price: getRandomNumber()
      },
      {
        id: 5,
        title: 'Choose language',
        price: getRandomNumber()
      }
    ]
  }
];

export function getRandomOffer() {
  return getRandomArrayElement(mockOffers);
}

/* const pointTypeOffer = offers
    .find((offer) => offer.type === point.type);

  pointTypeOffer.offers
    .map((offer) => {
      const checked = point.offers.includes(offer.id) ? 'checked' : '';

      return `<input type="checkbox" ${checked} />`;
    })
*/
