import React, { useContext, useState } from 'react';
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
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column-filter">
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (event) => setColumnFilter(event.target.value) }
          >
            {columnFilterList.map((filter) => (
              <option key={ filter } value={ filter }>
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
          disabled={ columnFilterList.length === 0 }
        >
          Filtrar
        </button>
      </form>

      {
        filtersList.length > 0 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remover todas filtragens
          </button>
        )
      }

      <ul>
        {filtersList.map((filter) => (
          <li key={ filter.column } data-testid="filter">
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
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
