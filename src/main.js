import RouteComponent from "./components/route";
import TripCostComponent from "./components/trip-cost";
import SiteMenuComponent from "./components/site-menu";
import FiltersComponent from "./components/filters";
import SortingComponent from "./components/sorting";
import TripDaysComponent from "./components/trip-days";
import TripDayComponent from "./components/trip-day";
import TripEventComponent from "./components/trip-event";
import TripEditComponent from "./components/trip-edit";
import NoEventsComponent from "./components/no-events";

import {generateDays} from "./mock/point";
import {Filters} from "./const";
import {render, RenderPosition} from './utils.js';

const days = generateDays(5);
const isAllEventsArchived = days.every((day) => day.events.every((event) => event.isArchived));

const renderEvent = (tripDayListElement, event) => {
  const tripEventComponent = new TripEventComponent(event);
  const tripEditComponent = new TripEditComponent(event);

  const replaceEditToEvent = () => {
    tripDayListElement.replaceChild(tripEventComponent.getElement(), tripEditComponent.getElement());
  };

  const replaceEventToEdit = () => {
    tripDayListElement.replaceChild(tripEditComponent.getElement(), tripEventComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const toExpandButton = tripEventComponent.getElement().querySelector(`.event__rollup-btn`);
  const toNarrowButton = tripEditComponent.getElement().querySelector(`.event__rollup-btn`);

  toExpandButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  toNarrowButton.addEventListener(`click`, replaceEditToEvent);

  const editForm = tripEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToEvent);

  render(tripDayListElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripControlsElement, new FiltersComponent(Filters).getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new SiteMenuComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripCostComponent(days).getElement(), RenderPosition.BEFOREEND);

if (isAllEventsArchived) {
  render(tripEventsElement, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripInfoElement, new RouteComponent(days).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripDaysComponent().getElement(), RenderPosition.BEFOREEND);

  const tripDaysElement = document.querySelector(`.trip-days`);

  days.map((day, index) => {
    const tripDayComponent = new TripDayComponent(day, index + 1);
    render(tripDaysElement, tripDayComponent.getElement(), RenderPosition.BEFOREEND);

    const tripDayListElement = tripDayComponent.getElement().querySelector(`.trip-events__list`);

    day.events.forEach((event) => {
      renderEvent(tripDayListElement, event);
    });
  });
}

