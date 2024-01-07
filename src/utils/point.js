import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';

//функция по преобразованию даты от сервера в читабельный вид
export function humanizePointDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

//функция подсчёта длительности от даты начала и конца
export function calculateDuration(startDate, endDate) {
  const daysDiff = dayjs(endDate).diff(startDate, 'd');
  // eslint-disable-next-line no-undef
  const hoursDiff = dayjs(dayjs(endDate).subtract(daysDiff, 'day')).diff(startDate, 'h');
  // eslint-disable-next-line no-undef
  const minutesDiff = dayjs(dayjs(endDate).subtract(daysDiff, 'day').subtract(hoursDiff, 'hour')).diff(startDate, 'm');

  if (daysDiff === 0) {
    return `${hoursDiff}h ${minutesDiff}m`;
  }

  if (daysDiff === 0 && hoursDiff === 0) {
    return `${minutesDiff}m`;
  }

  return `${daysDiff}D ${hoursDiff}h ${minutesDiff}m`;
}

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
/* function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortTaskUp(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
}

function sortTaskDown(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
}
 */
