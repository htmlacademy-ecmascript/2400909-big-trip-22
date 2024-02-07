import dayjs from 'dayjs';
import { TYPES } from '../const';

const DATE_FORMAT = 'D MMM';

//функция по преобразованию даты от сервера в читабельный вид
export function humanizePointDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

//функция подсчёта длительности от даты начала и конца
export function calculateDuration(startDate, endDate) {
  const daysDiff = dayjs(endDate).diff(startDate, 'd');
  const hoursDiff = dayjs(dayjs(endDate).subtract(daysDiff, 'day')).diff(startDate, 'h');
  const minutesDiff = dayjs(dayjs(endDate).subtract(daysDiff, 'day').subtract(hoursDiff, 'hour')).diff(startDate, 'm');

  if (daysDiff === 0) {
    return `${hoursDiff}h ${minutesDiff}m`;
  }

  if (daysDiff === 0 && hoursDiff === 0) {
    return `${minutesDiff}m`;
  }

  return `${daysDiff}D ${hoursDiff}h ${minutesDiff}m`;
}

export const getEmptyPoint = () => ({
  id: 0,
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TYPES[0],
});

const convertDate = (date, format) => date ? dayjs(date).format(format) : '';

export const getMinDate = (items) => convertDate(dayjs.min(items.map((item) => dayjs(item))), DATE_FORMAT);

export const getMaxDate = (items) => convertDate(dayjs.max(items.map((item) => dayjs(item))), DATE_FORMAT);
