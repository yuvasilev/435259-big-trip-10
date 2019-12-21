export const createTripCostTemplate = (days) => {

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
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost()}</span>
    </p>`
  );
};
