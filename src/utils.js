import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY h:mm A';

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomNumber(min = 10, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

//функция по преобразованию даты от сервера в читабельный вид
export function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

