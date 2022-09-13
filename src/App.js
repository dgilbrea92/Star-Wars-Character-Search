import { useCharacterData } from './hooks';
import { CharacterCard } from './CharacterCard';
import { useState } from 'react';

let id = 100;

export default function App() {
  const [filter, setFilter] = useState('name');
  const [search, setSearch] = useState('');
  const { 
    characters, 
    isLoading, 
    isError, 
    page, 
    maxPage, 
    goToNextPage, 
    goToPrevPage, 
    goToFirstPage, 
    goToLastPage 
  } = useCharacterData(filter, search);  

  const handleInput = e => {
      setSearch(e.target.value);
      goToFirstPage();
  }

  return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onChange={e => setFilter(e.target.value)}>
              <input type="radio" id="name" value="name" name="filter" defaultChecked /> Name
              <input type="radio" id="homeworld" value="homeworld" name="filter"  /> Home World
            </div>
            <input value={search} onChange={handleInput} placeholder={filter ? `Search by ${filter}...` : 'Please select a filter type...'} style={{ width: '25%', margin: '8px' }} />
            <button onClick={goToFirstPage} disabled={page === 1 || isLoading}>&lt;&lt;</button>
            <button onClick={goToPrevPage} disabled={page === 1 || isLoading}>&lt;</button>
            <button onClick={goToNextPage} disabled={page === maxPage || isLoading}>&gt;</button>
            <button onClick={goToLastPage} disabled={page === maxPage || isLoading}>&gt;&gt;</button>
          </div>
          {isError && <p>Failed to load character data...</p>}
          {isLoading ? (<p>Loading character data...</p> ) : characters.map(character => (
            <CharacterCard key={id++} name={character.name} homeworld={character.homeworld} />
          ))}
      </div>
  );
}
