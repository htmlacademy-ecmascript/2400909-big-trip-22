import { TYPES } from "../const.js"
import { getRandomArrayElement } from "../utils.js"

export const mockPoints = [
  {
    id: 1,
    base_price: 1100,
    dateFrom: "2019-07-10T22:55:56.845Z",
    dateTo: "2019-07-11T11:22:13.375Z",
    destination: ,
    isFavorite: false,
    offers: [1, 2],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 2,
    base_price: 1700,
    dateFrom: "2019-08-11T22:55:56.845Z",
    dateTo: "2019-08-19T11:22:13.375Z",
    destination: ,
    isFavorite: false,
    offers: [1, 2, 3],
    type: getRandomArrayElement(TYPES)
  },
  {
    id: 3,
    base_price: 700,
    dateFrom: "2019-09-09T22:55:56.845Z",
    dateTo: "2019-09-15T11:22:13.375Z",
    destination: ,
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(TYPES)
  }
]

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

