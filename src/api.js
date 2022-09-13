import axios from 'axios';

export const getPeople = async (page, searchTerm) => {
    const { data } = await axios.get(`https://swapi.dev/api/people?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`);
    const results = data?.results.map(character => ({ name: character.name, homeworld: character.homeworld}));
    return { 
        pageCount: Math.ceil(data.count / 10), 
        data: results
    };
}

export const getPlanetName = async (url) => {
    const { data } = await axios.get(url);
    return data?.name;
}

export const getPlanetResidents = async searchTerm => {
    const { data } = await axios.get(`https://swapi.dev/api/planets${searchTerm ? `?search=${searchTerm}` : ''}`);
    const people = data?.results.map(planet => planet.residents).flat();
    const results = await Promise.all(people.map(person => {
        return axios.get(person)
            .then(({ data }) => {
                return { name: data.name, homeworld: data.homeworld };
            })
    }));
    return {
        pageCount: 1,
        data: results
    };
}
