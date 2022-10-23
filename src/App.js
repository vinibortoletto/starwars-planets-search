import React, { useContext } from 'react';

import { PlanetsContext } from './contexts/PlanetsContext';
import FilterPlanets from './components/FilterPlanets';
import SearchPlanets from './components/SearchPlanets';
import Table from './components/Table';

import './App.css';
import SortPlanets from './components/SortPlanets';
import Loading from './components/Loading';
import Logo from './components/Logo';

function App() {
  const { isLoading } = useContext(PlanetsContext);

  return (
    <div>
      {isLoading
        ? <Loading />
        : (
          <main>
            <Logo />

            <div className="content">
              <SearchPlanets />
              <div className="flex">
                <FilterPlanets />
                <SortPlanets />
              </div>

              <Table />
            </div>
          </main>
        )}
    </div>
  );
}

export default App;
