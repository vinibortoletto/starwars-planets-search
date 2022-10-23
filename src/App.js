import React, { useContext } from 'react';

import { PlanetsContext } from './contexts/PlanetsContext';
import FilterPlanets from './components/FilterPlanets';
import SearchPlanets from './components/SearchPlanets';
import Table from './components/Table';

import './App.css';
import SortPlanets from './components/SortPlanets';
import Loading from './components/Loading';
import Logo from './components/Logo';
import Footer from './components/Footer';

function App() {
  const { isLoading } = useContext(PlanetsContext);

  return (
    <div>
      {isLoading
        ? <Loading />
        : (
          <>
            <header>
              <Logo />

            </header>
            <main>

              <div className="content">
                <SearchPlanets />
                <div className="lg:flex lg:justify-center">
                  <FilterPlanets />
                  <SortPlanets />
                </div>

                <Table />
              </div>
            </main>

            <Footer />
          </>
        )}
    </div>
  );
}

export default App;
