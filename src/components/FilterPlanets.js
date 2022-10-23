import React, { useContext, useState } from 'react';
import { ImCross } from 'react-icons/im';

import { PlanetsContext } from '../contexts/PlanetsContext';

const INITIAL_COLUMN_FILTER_LIST = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FilterPlanets() {
  const { filterPlanetsByNumber } = useContext(PlanetsContext);

  const [columnFilterList, setColumnFilterList] = useState([
    ...INITIAL_COLUMN_FILTER_LIST,
  ]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filtersList, setFiltersList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFiltersList = [
      ...filtersList,
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ];

    filterPlanetsByNumber(newFiltersList);
    setFiltersList(newFiltersList);

    const newColumnFilterList = columnFilterList.filter(
      (filter) => filter !== columnFilter,
    );
    setColumnFilterList(newColumnFilterList);
    setColumnFilter(newColumnFilterList[0]);
  };

  const removeFilter = (column) => {
    const newFiltersList = filtersList.filter(
      (filter) => filter.column !== column,
    );

    setFiltersList(newFiltersList);
    setColumnFilterList([...columnFilterList, column]);
    filterPlanetsByNumber(newFiltersList);
  };

  const removeAllFilters = () => {
    setFiltersList([]);
    setColumnFilterList([...INITIAL_COLUMN_FILTER_LIST]);
    filterPlanetsByNumber([]);
  };

  return (
    <div className="mb-10 max-w-3xl">
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col flex-wrap gap-4 md:flex-row justify-center"
      >
        <h2 className="w-full font-bold text-amber-500 text-lg text-center">
          Filtre por valores
        </h2>

        <label htmlFor="column-filter">
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (event) => setColumnFilter(event.target.value) }
            className="bg-zinc-800 border-2 border-amber-500 p-4 w-full"
          >
            {columnFilterList.map((filter) => (
              <option
                key={ filter }
                value={ filter }
                className="bg-zinc-800"
              >
                {filter}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="comparison-filter">
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ (event) => setComparisonFilter(event.target.value) }
            className="bg-zinc-800 border-2 border-amber-500 p-4 w-full"
          >
            <option
              value="maior que"
              className="bg-zinc-800"
            >
              maior que
            </option>
            <option
              value="menor que"
              className="bg-zinc-800"
            >
              menor que
            </option>
            <option
              value="igual a"
              className="bg-zinc-800"
            >
              igual a
            </option>
          </select>
        </label>

        <label htmlFor="value-filter">
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ (event) => setValueFilter(event.target.value) }
            className="bg-zinc-800 border-2 border-amber-500
            p-4 w-full"
          />
        </label>

        <button
          type="submit"
          data-testid="button-filter"
          disabled={ columnFilterList.length === 0 }
          className="bg-amber-500 text-zinc-900 font-bold uppercase p-4"
        >
          Filtrar
        </button>
      </form>

      <div className="my-10">
        {
          filtersList.length > 0 && (
            <div className="flex justify-center mb-4">
              <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ removeAllFilters }
                className="bg-orange-800 text-zinc-100 font-bold uppercase p-4"
              >
                Remover todas filtragens
              </button>
            </div>
          )
        }

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtersList.map((filter) => (
            <li
              key={ filter.column }
              data-testid="filter"
              className="flex items-center justify-between gap-4 p-4 bg-zinc-800"
            >
              <p>
                {`
                ${filter.column} 
                ${filter.comparison} 
                ${filter.value}
             `}
              </p>
              <button
                data-testid="remove-filter-btn"
                type="button"
                onClick={ () => removeFilter(filter.column) }
                className="bg-orange-800 text-zinc-100 font-bold uppercase p-4"
              >
                <ImCross />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
