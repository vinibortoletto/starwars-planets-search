import React, { useContext } from 'react';
import { PlanetsContext } from './PlanetsContext';

export default function Form() {
  const { nameFilter, filterPlanetsByText } = useContext(PlanetsContext);

  return (
    <form>
      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          id="name-filter"
          value={ nameFilter }
          onChange={ filterPlanetsByText }
        />
      </label>
    </form>
  );
}
