export const CharacterCard = ({ name, homeworld }) => (
    <div style={{ margin: '8px', border: '1px solid grey', borderRadius: '5px', padding: '8px' }}>
        <h1>{name}</h1>
        <p>{homeworld}</p>
    </div>
);
