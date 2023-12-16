import dayjs from 'dayjs';

const DATE_FORMAT = '';

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
  return dayjs(endDate).diff(startDate, 'd');
}

