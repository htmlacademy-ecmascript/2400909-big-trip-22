import { getRandomArrayElement } from '../utils/common.js';
import { getRandomNumber } from '../utils/common.js';
import { nanoid } from 'nanoid';

export const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'taxi offer 1',
        price: getRandomNumber()
      },
      {
        id: 2,
        title: 'taxi offer 2',
        price: getRandomNumber()
      },
      {
        id: 3,
        title: 'taxi offer 3',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 4,
        title: 'bus offer 1',
        price: getRandomNumber()
      },
      {
        id: 5,
        title: 'bus offer 2',
        price: getRandomNumber()
      },
      {
        id: 6,
        title: 'bus offer 3',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 7,
        title: 'train offer 1',
        price: getRandomNumber()
      },
      {
        id: 8,
        title: 'train offer 2',
        price: getRandomNumber()
      },
      {
        id: 9,
        title: 'train offer 3',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 10,
        title: 'ship offer 1',
        price: getRandomNumber()
      },
      {
        id: 11,
        title: 'ship offer 2',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 12,
        title: 'drive offer 1',
        price: getRandomNumber()
      },
      {
        id: 13,
        title: 'drive offer 2',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 14,
        title: 'flight offer 1',
        price: getRandomNumber()
      },
      {
        id: 15,
        title: 'flight offer 2',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'chek-in',
    offers: [
      {
        id: 16,
        title: 'check-in offer 1',
        price: getRandomNumber()
      },
      {
        id: 17,
        title: 'check-in offer 2',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 18,
        title: 'sightseeing offer 1',
        price: getRandomNumber()
      },
      {
        id: 19,
        title: 'sightseeing offer 2',
        price: getRandomNumber()
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 20,
        title: 'restaurant offer 1',
        price: getRandomNumber()
      },
      {
        id: 21,
        title: 'restaurant offer 2',
        price: getRandomNumber()
      }
    ]
  },
];

export function getRandomOffer() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockOffers)
  };
}


