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
    <div className="mb-10 mx">
      <h2 className="font-bold text-amber-500 text-lg text-center mb-4">
        Ordene os planetas
      </h2>

      <form
        onSubmit={ sortTable }
        className="flex flex-col flex-wrap gap-4 md:flex-row justify-center"
        // className="flex flex-col gap-4"
      >
        <label htmlFor="column-sort">
          <select
            name="column-sort"
            id="column-sort"
            data-testid="column-sort"
            value={ order.column }
            onChange={ (event) => setOrder({ ...order, column: event.target.value }) }
            className="bg-zinc-800 border-2 border-amber-500 p-4 w-full"
          >
            {SORT_OPTIONS.map((option) => (
              <option
                key={ option }
                value={ option }
                className="bg-zinc-800"
              >
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex md:flex-col gap-4 justify-center">
          <label htmlFor="column-sort-input-asc">
            <input
              type="radio"
              id="column-sort-input-asc"
              data-testid="column-sort-input-asc"
              name="sort"
              value="ASC"
              checked={ order.sort === 'ASC' }
              onChange={ (event) => setOrder({ ...order, sort: event.target.value }) }
            />
            <span className="ml-2 font-bold">Ascendente</span>
          </label>

          <label htmlFor="column-sort-input-desc">
            <input
              type="radio"
              id="column-sort-input-desc"
              data-testid="column-sort-input-desc"
              name="sort"
              value="DESC"
              onChange={ (event) => setOrder({ ...order, sort: event.target.value }) }
            />
            <span className="ml-2 font-bold">Descendente</span>
          </label>
        </div>

        <button
          type="submit"
          data-testid="column-sort-button"
          onClick={ sortTable }
          className="bg-amber-500 text-zinc-900
           font-bold uppercase p-4"
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}
