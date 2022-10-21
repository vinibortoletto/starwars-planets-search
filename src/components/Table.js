import React, { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

export default function Table() {
  const { filteredPlanetsList } = useContext(PlanetsContext);

  const tableHeads = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  const tableContent = filteredPlanetsList.map((planet) => {
    const planetInfos = Object.values(planet);

    return (
      <tr key={ planet.name } data-testid="tbody">
        {planetInfos.map((info, index) => (
          <td key={ index }>{info}</td>
        ))}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          {tableHeads.map((head) => (
            <th key={ head } data-testid="thead">{head}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableContent}
      </tbody>
    </table>
  );
}
