import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomNumber(min = 10, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

//функция по преобразованию даты от сервера в читабельный вид
export function humanizePointDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

//функция подсчёта длительности от даты начала и конца
export function calculateDuration(startDate, endDate) {
  const daysDiff = dayjs(endDate).diff(startDate, 'd');
  // eslint-disable-next-line no-undef
  const hoursDiff = dayjs(dayjs(endDate),subtract(daysDiff, 'day')).diff(startDate, 'h');
  // eslint-disable-next-line no-undef
  const minutesDiff = dayjs(dayjs(endDate),subtract(daysDiff, 'day').subtract(hoursDiff, 'hour')).diff(startDate, 'm');

  if (daysDiff === 0) {
    return `${hoursDiff}h ${minutesDiff}m`;
  }

  if (daysDiff === 0 && hoursDiff === 0) {
    return `${minutesDiff}m`;
  }

  return `${daysDiff}D ${hoursDiff}h ${minutesDiff}m`;
}

