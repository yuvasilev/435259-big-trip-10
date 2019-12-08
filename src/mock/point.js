import {Types, Cities, Places, Options, Description, Months} from "../const";

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomOneOfArrayItem = (firstArray, secondArray) => {
  return Math.random() > .5
    ? getRandomArrayItem(firstArray)
    : getRandomArrayItem(secondArray)
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomHours = () => {
  const targetDate = new Date();

  targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(0, 7),
    targetDate.getMinutes() + getRandomIntegerNumber(0, 60));

  return targetDate;
};

export const generatePoint = () => {
  const descArr = [];

  for (let i = 0; i <= getRandomIntegerNumber(1, 3); i++) {
    descArr[i] = ``;
  }

  return {
    type: getRandomArrayItem(Types),
    destination: getRandomOneOfArrayItem(Cities, Places),
    time: {
      from: new Date,
      to: getRandomHours()
    },
    price: getRandomIntegerNumber(10, 200),
    options: Options.map((option) => ({
      title: option,
      active: Math.random() > .5,
      price: getRandomIntegerNumber(10, 200),
    })),
    description: {
      text: descArr.map(() => `${getRandomArrayItem(Description)}`).join(` `),
      images: [
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`
      ]
    },
    isFavorite: Math.random() > .5
  }
};

export const generateDay = (count) => {
  return new Array(count)
    .fill(``).map(generatePoint);
};

export const generateDays = (count) => {
  return new Array(count)
    .fill(``).map((day, index) => {
      const date = new Date;
      date.setDate(date.getDate() + index);

      return {
        date, events: generateDay(4)}
    });
};

