import {createElement} from "../utils";

const createTripCostTemplate = (days) => {

  const getTripCost = () => days.reduce((accumulatorDays, currentValueDays) => {

    if (typeof accumulatorDays !== `number`) {
      accumulatorDays = accumulatorDays.events.reduce((accumulator, currentValue) =>
        (typeof accumulator === `number` ? accumulator : accumulator.price) + currentValue.price);
    }

    return accumulatorDays + currentValueDays.events.reduce((accumulator, currentValue) =>
      (typeof accumulator === `number` ? accumulator : accumulator.price) + currentValue.price);

  });

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${days.length === 0 ? 0 : getTripCost()}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(days) {
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._days);
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

