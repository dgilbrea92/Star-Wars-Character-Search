import { useQuery } from '@tanstack/react-query';
import { getPlanetName } from './api';

export const CharacterCard = ({ name, homeworld }) => {
    const { data: homeworldName, isLoading, error } = useQuery([homeworld], () => getPlanetName(homeworld));
    return (
        <div style={{ margin: '8px', border: '1px solid grey', borderRadius: '5px', padding: '8px' }}>
            <h1>{name}</h1>
            {isLoading ? <p>Loading homeworld data...</p> : <p>{homeworldName}</p>}
            {error && <p>Failed to load homeworld data...</p>}
        </div>
    )
};
