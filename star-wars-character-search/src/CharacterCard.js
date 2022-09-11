export const CharacterCard = ({ name, homeworld }) => (
    <div style={{ margin: '3px', border: '1px solid gray', borderRadius: '5px', padding: '5px' }}>
        <h1>{name}</h1>
        <p>{homeworld}</p>
    </div>
);
