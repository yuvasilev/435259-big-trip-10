import {Cities, Types} from "../const";

export const createTripEditEventTemplate = (point) => {
  const getCitiesOptions = () =>
    Cities.map((city) => `<option value="${city}"></option>`);

  const getFormattedDate = (date) => `${date.toLocaleDateString().replace(/\./gi, `/`)}`;

  const getFormattedTime = (date) =>
    `${date.getHours() < 10
      ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10
      ? `0${date.getMinutes()}` : date.getMinutes()}`;

  const getOffersMarkup = (offers) =>
    offers.map((offer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${offer.active ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.type}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    )).join(``);

  const getImagesMarkup = (images) =>
    images.map((image) => (
      `<img class="event__photo" src="${image}" alt="Event photo">`
    )).join(``);

  const getTypesMarkup = (types) =>
    types.map((type) => (
      `<div class="event__type-item">
        <input id="event-type-${type.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type.name === point.type.name ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${type.name}" for="event-${type.name}-taxi-1">${type.label}</label>
      </div>`
    )).join(``);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.icon}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
  
                ${getTypesMarkup(Types)}
              </fieldset>
            </div>
          </div>
  
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${point.type.title}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${getCitiesOptions()}
            </datalist>
          </div>
  
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedDate(point.time.from)} ${getFormattedTime(point.time.from)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedDate(point.time.to)} ${getFormattedTime(point.time.to)}">
          </div>
  
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
          </div>
  
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
  
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${point.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
  
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
  
        <section class="event__details">
  
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
            <div class="event__available-offers">
              ${getOffersMarkup(point.options)}
            </div>
          </section>
  
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${point.description.text}</p>
  
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${getImagesMarkup(point.description.images)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};
