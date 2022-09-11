import { useCharacterData } from './hooks';
import { CharacterCard } from './CharacterCard';

let id = 100;

export default function App() {
  const { characters, isLoading, isError } = useCharacterData();  

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      {isError && <p>Failed to load character data...</p>}
      {isLoading ? (<p>Loading character data...</p> ) : 
        characters.map(character => (
          <CharacterCard key={id++} name={character.name} homeworld={character.homeworld} />
        ))
      }
    </div>
  );
}
