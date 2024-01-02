import { filter, sort } from '../utils/filter.js';

export function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export function generateSort(points) {
  return Object.entries(sort).map(
    ([sortType, sortPoints]) => ({
      type: sortType,
      count: sortPoints(points).length,
    }),
  );
}
