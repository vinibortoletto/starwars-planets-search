import React, { useContext } from 'react';

import { PlanetsContext } from './contexts/PlanetsContext';
import FilterPlanets from './components/FilterPlanets';
import SearchPlanets from './components/SearchPlanets';
import Table from './components/Table';

import './App.css';
import SortPlanets from './components/SortPlanets';

function App() {
  const { isLoading } = useContext(PlanetsContext);

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : (
          <main>
            <SearchPlanets />
            <FilterPlanets />
            <SortPlanets />
            <Table />
          </main>
        )}
    </div>
  );
}

export default App;
