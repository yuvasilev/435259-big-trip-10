import {createTripEventTemplate} from "./trip-event";
import {createTripEditEventTemplate} from "./trip-edit";

import {Months} from "../const";

export const createTripDayTemplate = (day, dayNum) => {
  const getFormattedDate = () =>
    `${Months[day.date.getMonth()]} ${day.date.getDate() < 10 ? `0${day.date.getDate()}`: day.date.getDate()}`;

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNum}</span>
          <time class="day__date" datetime="2019-03-18">${getFormattedDate()}</time>
        </div>
        
        <ul class="trip-events__list">
      ${day.events.map((event, index) =>
          index === 1
            ? createTripEditEventTemplate(event) :
            createTripEventTemplate(event)
        ).join(``)}    
        </ul>
      </li>`
  )
};

