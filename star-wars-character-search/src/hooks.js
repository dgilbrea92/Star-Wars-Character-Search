import { useEffect, useState } from 'react';

export function useCharacterData() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            setCharacters(data.results);
            setIsLoading(false);
        })
        .catch(() => setIsError(true))
    } , []);

    return { characters, isLoading, isError };
}
