import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

export default function FilterPlanets() {
  const {
    filterPlanetsByNumber,
  } = useContext(PlanetsContext);

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const handleSubmit = (event) => {
    event.preventDefault();
    filterPlanetsByNumber(columnFilter, comparisonFilter, valueFilter);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="column-filter">
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (event) => setColumnFilter(event.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison-filter">
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ (event) => setComparisonFilter(event.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value-filter">
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ (event) => setValueFilter(event.target.value) }
          />
        </label>

        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
