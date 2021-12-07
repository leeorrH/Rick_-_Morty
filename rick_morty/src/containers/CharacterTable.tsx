import { Pagination } from '@mui/material';
import React from 'react';
import ContentTable, { ICharacter } from '../components/ContentTable/ContentTable';
import { StateContext } from '../store/store';

type Info = {
    count: number,
    pages: number
}
export const CharacterTable: React.FC = () => {
    const [characters, setCharacters] = React.useState<ICharacter[]>([]);
    const [error, setError] = React.useState<any>(null);
    const [info, setInfo] = React.useState<Info | null>(null)
    const [columnsTitle, setColumnsTitle] = React.useState<string[]>([]);
    const { state, dispatch } = React.useContext(StateContext);
    const [maxPage, setMaxPage] = React.useState<number>(0);
    const baseUrl: string = "https://rickandmortyapi.com/api";


    React.useEffect(() => {
        let res : any;
        const fetchData = async () => {
            try {
                res = await fetch(baseUrl.concat(`/character/?page=${state.page}&name=${state.searchText}&status=${state.status}&gender=${state.gender}`));
                if (res.status != 404) {
                    const json = await res.json();
                    if (json.info.count > 0) {
                        let characters = await toCharacters(json);
                        setCharacters(characters);

                        let infoData = toInfo(json);
                        setInfo(infoData);

                        setColumnsTitle(Object.keys(characters[0]).filter(key => key !== "id" && key !== "episode"));
                        setMaxPage(json.info.pages);
                        setError(false);
                    }
                }
                else {
                    setMaxPage(0);
                }
            } catch (error : any) {
                console.error(error as string);
                setError(error);
            }
        };
        fetchData();
    }, [state]);

    //useCallback - try to remove warning - without success
    const toCharacters = React.useCallback( async (response: any): Promise<ICharacter[]> => {
        let charactersArr: ICharacter[] = await response.results.map(async (character: any): Promise<ICharacter> => {
            let episodes = await getEpisodes(character.episode);
            let temp: ICharacter = {
                image: character.image,
                name: character.name,
                origin: character.origin.name,
                episode: episodes,
                status: character.status,
                species: character.species,
                gender: character.gender,
                id: character.id,
            };

            return temp;
        });

        charactersArr = await Promise.all(charactersArr);

        return charactersArr;
    },[]);

    async function getEpisodes(episodes: any) {
        let episodesRes: any = await fetch(baseUrl.concat(`/episode/${episodes[0].split("/").at(-1)},${episodes.at(-1).split("/").at(-1)}`));
        let episodeArr: string[] = [""];

        if (episodesRes.status == 200) {
            const episodeJson = await episodesRes.json();
            if (episodeJson.length > 0) {
                episodeArr = episodeJson.map((ep: any) => ep?.episode as string);
            }
        }
        return episodeArr;
    }

    function toInfo({ info }: any): Info {
        let result: Info = {
            count: info.count,
            pages: info.pages
        }

        return result;
    }

    if (!characters) return (<h2>Loading...</h2>);

    if (maxPage == 0) return (<h2>No Results...</h2>);




    return (
        <>
            <ContentTable characters={characters} headers={columnsTitle} />
            <Pagination
                page={state.page}
                count={info?.pages}
                onChange={(e, page) => {
                    dispatch({
                        type: "SET_PAGE",
                        payload: page
                    })
                }} />
        </>
    )
}


