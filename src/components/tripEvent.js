export const creatTripEvent = (point) => {

  const getFormattedTime = (date) =>
    `${date.getHours() < 10
      ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10
      ? `0${date.getMinutes()}` : date.getMinutes()}`;

  const getFormattedTimeDiff = () => {
    const timeDiff = point.time.to - point.time.from;
    const timeDiffHours = (timeDiff / (1000 * 60)) / 60;
    const timeDiffMinutes = (timeDiff / (1000 * 60)) % 60;

    return `${Math.floor(timeDiffHours) < 10
      ? `0${Math.floor(timeDiffHours)}`
      : Math.floor(timeDiffHours)}H ${timeDiffMinutes < 10 ? `0${timeDiffMinutes}` : timeDiffMinutes}M`;
  };

  let offersCounter = 0;
  const getOffersMarkup = (offers) => offers.map((offer) => {
    if (!offer.active) {
      return;
    }

    if (offersCounter >= 2) {
      return;
    }

    offersCounter++;
    /* eslint-disable-next-line */
    return (`
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
       </li>
    `);
  }).join(``);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.icon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type.title} ${point.destination}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getFormattedTime(point.time.from)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getFormattedTime(point.time.to)}</time>
          </p>
          <p class="event__duration">${getFormattedTimeDiff()}</p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffersMarkup(point.options)}
        </ul>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
