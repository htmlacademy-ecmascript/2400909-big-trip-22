import { FilterType, SortType } from '../const.js';
import dayjs from 'dayjs';
import { calculateDuration } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo))),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo)))
};

const sort = {
  [SortType.DAY]: (points) => points.sort((first, second) => dayjs(first.dateFrom).diff(dayjs(second.dateFrom))),
  [SortType.PRICE]: (points) => points.sort((first, second) => second.price - first.price),
  [SortType.TIME]: (points) => points.sort((first, second) => calculateDuration(second.dateFrom, second.dateTo, true) - calculateDuration(first.dateFrom, first.dateTo, true))
};

export { filter, sort };
