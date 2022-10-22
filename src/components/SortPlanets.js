import React, { useState, useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

const SORT_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function SortPlanets() {
  const { filteredPlanetsList, setFilteredPlanetsList } = useContext(PlanetsContext);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const sortTable = () => {
    const newFilteredPlanetsList = filteredPlanetsList
      .sort((a, b) => {
        if (order.sort === 'ASC') return a[order.column] - b[order.column];
        return b[order.column] - a[order.column];
      })
      .filter((planet) => planet[order.column] !== 'unknown');

    const planetsWithUnknownInfo = filteredPlanetsList
      .filter((planet) => planet[order.column] === 'unknown');

    setFilteredPlanetsList([...newFilteredPlanetsList, ...planetsWithUnknownInfo]);
  };

  return (
    <>
      <label htmlFor="column-sort">
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          value={ order.column }
          onChange={ (event) => setOrder({ ...order, column: event.target.value }) }
        >
          {SORT_OPTIONS.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>

      <div>
        <label htmlFor="column-sort-input-asc">
          <span>Ascendente</span>
          <input
            type="radio"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ (event) => setOrder({ ...order, sort: event.target.value }) }
          />
        </label>

        <label htmlFor="column-sort-input-desc">
          <span>Descendente</span>
          <input
            type="radio"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
            onChange={ (event) => setOrder({ ...order, sort: event.target.value }) }
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortTable }
      >
        Ordenar
      </button>

    </>
  );
}
