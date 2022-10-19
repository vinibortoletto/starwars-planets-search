import React, { useContext } from 'react';
import './App.css';
import { PlanetsContext } from './components/PlanetsContext';
import Table from './components/Table';

function App() {
  const { isLoading } = useContext(PlanetsContext);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : <Table />}
    </div>
  );
}

export default App;
