import React, { useContext } from 'react';
import { PlanetsContext } from './PlanetsContext';

export default function Table() {
  const { planetsList } = useContext(PlanetsContext);

  const tableHeads = Object.keys(planetsList[0])
    .map((head) => (<th key={ head }>{head}</th>));

  const tableContent = planetsList.map((planet) => {
    const planetInfos = Object.values(planet);

    return (
      <tr key={ planet.name }>
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
          {tableHeads}
        </tr>
      </thead>

      <tbody>
        {tableContent}
      </tbody>
    </table>
  );
}
