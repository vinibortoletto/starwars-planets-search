import React, { createContext, useState, useEffect, useMemo } from 'react';
import { shape } from 'prop-types';
import getPlanets from '../services/planetsApi';

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await getPlanets();
      setPlanetsList(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const value = useMemo(() => ({
    planetsList,
    isLoading,
  }), [planetsList, isLoading]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: shape({}).isRequired,
};
