import { useEffect, useState } from 'react';

export function useCharacterData() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            return Promise.all(data.results.map(character => {
                return fetch(character.homeworld)
                    .then(response => response.json())
                    .then(res => {
                            character.homeworld = res.name;
                            return character;
                    })
                }))
            })
        .then(data => {
            setCharacters(data);
            setIsLoading(false);
            setIsError(false);
        })
        .catch(() => setIsError(true))
    }, [])

    return { characters, isLoading, isError };
}
