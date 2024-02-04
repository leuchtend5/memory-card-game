async function apiService(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const { name, sprites } = await response.json();
  const img = sprites['front_default'];
  return { id, name, img };
}

export default apiService;
