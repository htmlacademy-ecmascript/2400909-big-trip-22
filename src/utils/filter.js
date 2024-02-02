import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FilterType } from '../const';
//import { calculateDuration } from './point';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function sortByPrice (eventA, eventB) {
  return eventA.basePrice - eventB.basePrice;
}

export function sortByTime(eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

export function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo))),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo)))
};

/* const sort = {
  [SortType.DAY]: (points) => points.sort((first, second) => dayjs(first.dateFrom).diff(dayjs(second.dateFrom))),
  [SortType.PRICE]: (points) => points.sort((first, second) => second.price - first.price),
  [SortType.TIME]: (points) => points.sort((first, second) => calculateDuration(second.dateFrom, second.dateTo, true) - calculateDuration(first.dateFrom, first.dateTo, true))
}; */

