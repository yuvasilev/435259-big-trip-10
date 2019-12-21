export const createTripFilters = (filters) => {
  const getFiltersMarkup = () =>
    filters.map((filter, index) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${index === 0 ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.label}</label>
      </div>`
    ).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${getFiltersMarkup()}  
    
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
