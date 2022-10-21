import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { shape } from 'prop-types';
import getPlanets from '../services/planetsApi';

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const planets = await getPlanets();
      setPlanetsList(planets);
      setFilteredPlanetsList(planets);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filterPlanetsByName = useCallback(({ target: { value } }) => {
    const newFilteredPlanetsList = planetsList
      .filter((planet) => planet.name.toLowerCase().includes(value));

    setFilteredPlanetsList(newFilteredPlanetsList);
    setNameFilter(value);
  }, [planetsList]);

  const filterPlanetsByNumber = useCallback((filtersList) => {
    if (filtersList.length === 0) return setFilteredPlanetsList(planetsList);

    const newFilteredPlanetsList = filtersList
      .reduce((acc, filter) => {
        const newAcc = acc.length > 0 ? acc : planetsList;

        return newAcc.filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return Number(planet[filter.column]) > Number(filter.value);
          case 'menor que':
            return Number(planet[filter.column]) < Number(filter.value);
          default:
            return Number(planet[filter.column]) === Number(filter.value);
          }
        });
      }, []);

    setFilteredPlanetsList(newFilteredPlanetsList);
  }, [planetsList]);

  const value = useMemo(() => ({
    isLoading,
    filteredPlanetsList,
    filterPlanetsByName,
    filterPlanetsByNumber,
    nameFilter,
    setNameFilter,
  }), [
    isLoading,
    filteredPlanetsList,
    filterPlanetsByName,
    filterPlanetsByNumber,
    nameFilter,
    setNameFilter,
  ]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: shape({}).isRequired,
};
