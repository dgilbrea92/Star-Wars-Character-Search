import { useState } from 'react';
import { getPeople, getPlanetResidents } from './api';
import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (filter, page, searchTerm = '') => {
    const { isLoading, error, data } = useQuery(
        [filter, page, searchTerm], 
        () => {
            return filter === 'homeworld' ? getPlanetResidents(searchTerm) : getPeople(page, searchTerm);
        }
    );
    return { data, isLoading, error };
}

export const useCharacterData = (filter, searchTerm) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useSearchQuery(filter, page, searchTerm);
    const maxPage = data?.pageCount || 1;

    const goToNextPage = () => {
        if (page < maxPage) setPage(page + 1);
        else setPage(maxPage);
    }

    const goToPrevPage = () => {
        if (page > 1) setPage(page - 1);
        else setPage(1);
    }

    const goToFirstPage = () => {
        setPage(1);
    }

    const goToLastPage = () => {
        setPage(maxPage);
    }

    return { characters: data?.data || [], isLoading, isError: !!error, page, maxPage, goToNextPage, goToPrevPage, goToFirstPage, goToLastPage };
}
