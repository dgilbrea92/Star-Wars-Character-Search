import { useCharacterData } from './hooks';

function App() {
  const { characters, isLoading, isError } = useCharacterData();  

  return (
    <div className="App">
      {isError && <p>Failed to load character data...</p>}
      {isLoading ? (<p>Loading character data...</p> ) : characters.map(character => (<div><h1>{character.name}</h1><p>{character.homeworld}</p></div>))}
    </div>
  );
}

export default App;
