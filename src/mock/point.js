import {Types, Cities, Places, Options, Description} from "../const";

// получить рандомный элемент массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};
// для вывода рандомом города или места
const getRandomOneOfArrayItem = (firstArray, secondArray) => {
  return Math.random() > 0.5
    ? getRandomArrayItem(firstArray)
    : getRandomArrayItem(secondArray);
};

// просто функция для рандома числа
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};
// это дата и время рандом
const getRandomHours = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 7);

  targetDate.setHours(targetDate.getHours() + diffValue, targetDate.getMinutes() + diffValue);

  return targetDate;
};

// вывод рандомом описания
const randomDescription = (arr, len) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  arr.length = len;
  return arr;
};

// точку делаем
export const generatePoint = () => {
  return {
    type: getRandomArrayItem(Types),
    destination: getRandomOneOfArrayItem(Cities, Places),
    time: {
      from: new Date(),
      to: getRandomHours(),
    },
    price: getRandomIntegerNumber(10, 150),
    options: Options.map((option) => ({
      title: option,
      price: getRandomIntegerNumber(10, 150),
      active: Math.random() > 0.5,
    })),
    description: randomDescription(Description, getRandomIntegerNumber(1, 3)),
    images: [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
    ],
    isFavorite: Math.random() > 0.5,
  };
};

export const generateDay = (count) => {
  return new Array(count)
    .fill(``).map(generatePoint);
};

export const generateDays = (count) => {
  return new Array(count)
    .fill(``).map((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      return {
        date, events: generateDay(4),
      };
    });
};
