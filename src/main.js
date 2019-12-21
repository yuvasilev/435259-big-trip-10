import {creatTripInfoTemplate} from './components/tripInfo';
import {createTripCostTemplate} from "./components/tripCost";
import {creatTripControlsTemplate} from './components/tripControls';
import {createTripFilters} from './components/tripFilters';
import {creatTripDay} from './components/tripDay';
import {creatTripSort} from './components/tripSort';
import {generateDays} from './mock/point';
import {Filters} from "./const";

const days = generateDays(4);

// вставляем разметку в блок
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// находим классы куда вставлять разметку
const siteMenuElement = document.querySelector(`.trip-main__trip-info`);
const siteTripControls = document.querySelector(`.trip-controls`);

// вставляем разметку из функций render в нужные места
render(siteMenuElement, creatTripInfoTemplate(days), `afterbegin`);
render(siteMenuElement, createTripCostTemplate(days), `beforeend`);

render(siteTripControls, creatTripControlsTemplate(), `beforeend`);
render(siteTripControls, createTripFilters(Filters), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, creatTripSort(), `beforeend`);


days.map((day, index) => {
  render(tripEvents, creatTripDay(day, index + 1), `beforeend`);
});
