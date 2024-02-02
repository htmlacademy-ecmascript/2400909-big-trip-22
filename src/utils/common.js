export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomNumber(min = 10, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/*В МОДЕЛЕ РЕАЛИЗОВАНО ОБНОВЛЕНИЕ ДАННЫХ
  ЭТА ФУНКЦИЯ НЕ НУЖНА УЖЕ
export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
} */
