import { useState, useEffect } from 'react'

export const useFetch = (url: string, options?: object) => {
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const baseUrl : string = "https://rickandmortyapi.com/api" ;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(baseUrl.concat(url), options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                console.error(error as string);
                setError(error);
            }
        };
        fetchData();
    }, []);

    return { response, error };
};
