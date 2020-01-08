import {createRouteTemplate} from "./components/route";
import {createTripCostTemplate} from "./components/trip-cost";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFiltersTemplate} from "./components/filters";
import {createSortingTemplate} from "./components/sorting";
import {createTripDaysTemplate} from "./components/trip-days";
import {createTripDayTemplate} from "./components/trip-day";

import {generateDays} from "./mock/point";
import {Filters} from "./const";

const days = generateDays(4);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, createRouteTemplate(days), `afterbegin`);
render(tripInfoElement, createTripCostTemplate(days), `beforeend`);

const tripControlsElement = document.querySelector(`.trip-controls`);
const menuTitleElement = document.querySelector(`.trip-controls > .visually-hidden`);

render(tripControlsElement, createFiltersTemplate(Filters), `beforeend`);
render(menuTitleElement, createSiteMenuTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createSortingTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripDaysElement = document.querySelector(`.trip-days`);

days.map((day, index) =>
  render(tripDaysElement, createTripDayTemplate(day, index + 1), `beforeend`)
);

