import React, { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

export default function SearchPlanets() {
  const {
    nameFilter,
    filterPlanetsByName,
  } = useContext(PlanetsContext);

  return (
    <div className="mb-10 max-w-md mx-auto">
      <h2 className="font-bold text-amber-500 text-lg text-center mb-4">
        Pesquise por um planeta
      </h2>

      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          id="name-filter"
          value={ nameFilter }
          onChange={ filterPlanetsByName }
          placeholder="Tatooine"
          className="bg-zinc-800 border-2 border-amber-500 p-4
          w-full"
        />
      </label>
    </div>
  );
}
