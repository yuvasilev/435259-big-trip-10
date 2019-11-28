import {creatTripInfoTemplate} from './components/tripInfo.js';
import {creatTripControlsTemplate} from './components/tripControls.js';
import {createTripFilters} from './components/tripFilters.js';
import {creatTripSort} from './components/tripSort.js';
import {creatEventslist} from './components/eventslist.js';
import {creatEditDay} from './components/editDay.js';
import {creatEventsDay} from './components/eventsDay.js';


//вставляем разметку в блок
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//находим классы куда вставлять разметку
const siteMenuElement = document.querySelector('.trip-main__trip-info');
const siteTripControls = document.querySelector('.trip-controls');

//вставляем разметку из функций render в нужные места 
render (siteMenuElement, creatTripInfoTemplate(), 'afterbegin');
render(siteTripControls, creatTripControlsTemplate(), 'beforeend');
render(siteTripControls, createTripFilters(), 'beforeend');

const tripEvents = document.querySelector('.trip-events');
render(tripEvents, creatTripSort(), 'beforeend');
render(tripEvents, creatEventslist(), 'beforeend');

const tripEventList = document.querySelector('.trip-events__list');
render(tripEventList, creatEditDay(), 'beforeend');

const eventsDayArray = ['','','']; 

const mapEventsDay = eventsDayArray.map((eventsDayArray) => {
  render(tripEventList, creatEventsDay(), `beforeend`);
});

