import React, { useContext } from 'react';
import './App.css';
import Form from './components/Form';
import { PlanetsContext } from './components/PlanetsContext';
import Table from './components/Table';

function App() {
  const { isLoading } = useContext(PlanetsContext);

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : (
          <main>
            <Form />
            <Table />
          </main>
        )}
    </div>
  );
}

export default App;
