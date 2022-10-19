import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { shape } from 'prop-types';
import getPlanets from '../services/planetsApi';

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const filterPlanetsByText = useCallback(({ target: { value } }) => {
    const newFilteredPlanetsList = planetsList
      .filter((planet) => planet.name.toLowerCase().includes(value));

    setFilteredPlanetsList(newFilteredPlanetsList);
    setNameFilter(value);
  }, [planetsList]);

  const value = useMemo(() => ({
    filteredPlanetsList,
    isLoading,
    filterPlanetsByText,
    nameFilter,
    setNameFilter,
  }), [
    filteredPlanetsList,
    isLoading,
    filterPlanetsByText,
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
