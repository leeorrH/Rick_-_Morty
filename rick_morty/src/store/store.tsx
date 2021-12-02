import { createContext, useContext, useReducer } from 'react';
import { StringLiteralLike } from 'typescript';
import { resourceLimits } from 'worker_threads';
import { ICharacter } from '../components/ContentTable/ContentTable';

type InitialStateType = {
    searchText: string;
    gender: string;
    status: string;
    filteredCharacters: ICharacter[];
    originCharacters: ICharacter[];
}

const defaultState: InitialStateType = {
    searchText: "",
    gender: "",
    status: "",
    filteredCharacters: [],
    originCharacters: []
}

export const StateContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: defaultState,
    dispatch: () => null
});

function filtering(character: ICharacter, state: InitialStateType): boolean {
    let result: boolean = character.gender.toLowerCase().includes(state.gender.toLowerCase())
        && character.status.toLowerCase().includes(state.status.toLowerCase())
        && character.name.toLowerCase().includes(state.searchText.toLowerCase());
    return result;
}

type ActionType = {
    type: string,
    payload: string | ICharacter[]
}

function stateReducer(prevState: InitialStateType, action: ActionType) {
    let updatedState: InitialStateType = prevState;
    let updateNeeded: boolean = false;

    switch (action.type) {
        case "SET_CHARACTERS":
            updatedState = {
                ...prevState,
                originCharacters : action.payload as ICharacter[]
            };
            updateNeeded = true;
        break;
        case "UPDATE_SEARCH_TEXT":
            updatedState = { ...prevState, searchText: action.payload as string };
            updateNeeded = true;
            break;
        case "UPDATE_STATUS":
            updatedState = { ...prevState, status: action.payload as string};
            updateNeeded = true;
            break;
        case "UPDATE_GENDER":
            updatedState = { ...prevState, gender: action.payload as string };
            updateNeeded = true;
            break;
        case "CLEAR":
            updatedState = {
                ...prevState,
                gender: "",
                status: "",
                searchText: "",
                filteredCharacters: prevState.originCharacters,
            }
            updateNeeded = true;
            break;

        default:
            console.error("function: StateReducer, Error: action property not included");
            break;

    }
    if(updateNeeded){
        let result = updatedState.originCharacters.filter(character => filtering(character, updatedState));
        updatedState = { ...updatedState, filteredCharacters: result };
    }
    return (updatedState);

}

export const StateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, defaultState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
}