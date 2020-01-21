import {Months} from "../const";
import {createElement} from "../utils";

const createTripDayTemplate = (day, dayNum) => {
  const getFormattedDate = () =>
    `${Months[day.date.getMonth()]} ${day.date.getDate() < 10 ? `0${day.date.getDate()}` : day.date.getDate()}`;

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNum}</span>
          <time class="day__date" datetime="2019-03-18">${getFormattedDate()}</time>
        </div>
        
        <ul class="trip-events__list"></ul>
      </li>`
  );
};

export default class TripDay {
  constructor(day, dayNum) {
    this._day = day;
    this._dayNum = dayNum;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._dayNum);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


