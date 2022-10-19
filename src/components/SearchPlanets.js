import React, { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

export default function SearchPlanets() {
  const {
    nameFilter,
    filterPlanetsByName,
  } = useContext(PlanetsContext);

  return (
    <label htmlFor="name-filter">
      <input
        type="text"
        data-testid="name-filter"
        id="name-filter"
        value={ nameFilter }
        onChange={ filterPlanetsByName }
      />
    </label>
  );
}
