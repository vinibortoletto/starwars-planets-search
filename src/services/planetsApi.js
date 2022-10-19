const ENDPOINT = 'https://swapi.dev/api/planets';

const getPlanets = async () => {
  const response = await fetch(ENDPOINT);
  const { results } = await response.json();

  const planets = results.map((planet) => {
    delete planet.residents;
    return planet;
  });

  return planets;
};

export default getPlanets;
