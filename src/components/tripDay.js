import {creatTripEvent} from './tripEvent';
import {createTripEditEventTemplate} from './tripEdit';
import {Months} from "../const";

export const creatTripDay = (day, dayNum) => {
  const getFormattedDate = () =>
    `${Months[day.date.getMonth()]} ${day.date.getDate() < 10 ? `0${day.date.getDate()}` : day.date.getDate()}`;
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${dayNum}</span>
              <time class="day__date" datetime="2019-03-18">${getFormattedDate()}</time>
            </div>
            
            <ul class="trip-events__list">
          ${day.events.map((event, index) =>
      index === 1
        ? createTripEditEventTemplate(event) :
        creatTripEvent(event),
    ).join(``)}    
            </ul>
          </li>
    </ul>`
  )
};
