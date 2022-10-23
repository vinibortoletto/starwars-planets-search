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
      <tr
        key={ planet.name }
        data-testid="tbody"
        className=" even:bg-zinc-400/10 odd:bg-zinc-600/10
         hover:bg-zinc-500/20 transition"
      >
        {planetInfos.map((info, index) => (
          <td
            key={ index }
            data-testid={ info === planet.name ? 'planet-name' : '' }
            className="p-4"
          >
            {info}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className="min-h-[20rem] overflow-x-auto border border-zinc-600">
      <table className="table-fixed">
        <thead>
          <tr>
            {tableHeads.map((head) => (
              <th
                key={ head }
                data-testid="thead"
                className="bg-zinc-800 p-4"
              >
                {head}

              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableContent}
        </tbody>
      </table>
    </div>
  );
}
