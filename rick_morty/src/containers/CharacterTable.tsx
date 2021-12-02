import { Pagination } from '@mui/material'
import React, { ChangeEvent } from 'react'
import ContentTable, { ICharacter } from '../components/ContentTable/ContentTable'
import { StateContext } from '../store/store';


export const CharacterTable: React.FC = () => {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [response, setResponse] = React.useState<ICharacter[] | null>(null);
    const [error, setError] = React.useState<any>(null);
    const [columnsTitle, setColumnsTitle] = React.useState<string[]>([]);
    const {dispatch, state} = React.useContext(StateContext);
    const baseUrl: string = "https://rickandmortyapi.com/api";

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(baseUrl.concat("/character/?page=" + pageNumber));
                const json = await res.json();
                let characters = toCharacters(json) ;
                setResponse(characters);
                setColumnsTitle( Object.keys(characters[0]).filter(key => key !== "id"));
                dispatch({ 
                    type:"SET_CHARACTERS",
                    payload: characters
                });
            } catch (error) {
                console.error(error as string);
                setError(error);
            }
        };
        fetchData();
    }, [pageNumber]);

    function toCharacters(response: any): ICharacter[] {
        let charactersArr: ICharacter[] = response.results.map((character: any) => {
            let temp: ICharacter = {
                image: character.image,
                name: character.name,
                origin: character.origin.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                id: character.id,
            }
            return temp;
        });
        
        return charactersArr;
    }

    if (!response) return (<h2>Loading...</h2>);

    if (error) return (<h2>Error</h2>);



    return (
        <>
            <ContentTable characters={state.filteredCharacters} headers={columnsTitle} />
            <Pagination count={42} onChange={(e,page) => {
                setPageNumber(page);
            }}></Pagination>
        </>
    )
}


