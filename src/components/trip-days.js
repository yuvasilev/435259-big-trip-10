import {createElement} from "../utils";

const createTripDaysTemplate = () =>
  `<ul class="trip-days"></ul>`;

export default class TripDays {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate();
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
