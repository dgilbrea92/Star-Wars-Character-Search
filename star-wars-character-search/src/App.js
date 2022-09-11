import { useCharacterData } from './hooks';
import { CharacterCard } from './CharacterCard';
import { useState } from 'react';

let id = 100;

const memoSearch = () => {
  const cache = new Map();

  return (searchTerm, characters = []) => {
    const query = searchTerm.toLowerCase();
    if (cache.has(query)) {
      return cache.get(query);
    }
    const filteredList = characters.filter(character => character.homeworld.toLowerCase().search(query) !== -1 || character.name.toLowerCase().search(query) !== -1);
    cache.set(query, filteredList);
    return filteredList;
  }
}

export default function App() {
  const { characters, isLoading, isError } = useCharacterData();
  const [search, setSearch] = useState('');
  const filterChars = memoSearch();
  const filteredList = filterChars(search, characters);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      {isError && <p>Failed to load character data...</p>}
      {isLoading ? (<p>Loading character data...</p> ) : 
        <div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search by name or home planet...' style={{ width: '25%', margin: '8px' }} />
          {filteredList.map(character => (
            <CharacterCard key={id++} name={character.name} homeworld={character.homeworld} />
          ))}
        </div>
      }
    </div>
  );
}
