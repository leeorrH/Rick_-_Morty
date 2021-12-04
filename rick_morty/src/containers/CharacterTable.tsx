import { Button, Stack } from '@mui/material';
import React from 'react'
import ContentTable, { ICharacter } from '../components/ContentTable/ContentTable';
import { StateContext } from '../store/store';

type Info = {
    count: number,
    next: string,
    prev: string
    pages: number
}
export const CharacterTable: React.FC = () => {
    const [characters, setCharacters] = React.useState<ICharacter[]>([]);
    const [error, setError] = React.useState<any>(null);
    const [columnsTitle, setColumnsTitle] = React.useState<string[]>([]);
    const { state, dispatch } = React.useContext(StateContext);
    const [maxPage, setMaxPage] = React.useState<number>(0);
    const baseUrl: string = "https://rickandmortyapi.com/api";


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(baseUrl.concat(`/character/?page=${state.page}&name=${state.searchText}&status=${state.status}&gender=${state.gender}`));
                const json = await res.json();
                if(json.info.count > 0){
                    let characters = toCharacters(json);
                    setCharacters(characters);
                    setColumnsTitle(Object.keys(characters[0]).filter(key => key !== "id" && key !== "location"));
                    setMaxPage(json.info.pages);
                    setError(false);
                }
            } catch (error) {
                console.error(error as string);
                setError(error);
            }
        };
        fetchData();
    }, [state]);

    function toCharacters(response: any): ICharacter[] {
        let charactersArr: ICharacter[] = response.results.map((character: any) => {
            let temp: ICharacter = {
                image: character.image,
                name: character.name,
                origin: character.origin.name,
                location: character.location.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                id: character.id,
            }
            return temp;
        });

        return charactersArr;
    }




    if (!characters) return (<h2>Loading...</h2>);

    if (error) return (<h2>Error</h2>);




    return (
        <>
            <ContentTable characters={characters} headers={columnsTitle} />
            <Stack direction="row" spacing={2}>
                <Button
                    onClick={() => {
                        dispatch({
                            type: "DEC_PAGE"
                        })
                    }}
                    disabled={state.page == 1}>
                    previous
                </Button>
                <Button
                    disabled={maxPage == state.page}
                    onClick={() => {
                        dispatch({
                            type: "INC_PAGE"
                        })
                    }}>
                    next
                </Button>
            </Stack>
        </>
    )
}


