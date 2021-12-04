import { createContext, useContext, useReducer } from 'react';


type InitialStateType = {
    searchText: string;
    gender: string;
    status: string;
    page: number
}

const defaultState: InitialStateType = {
    searchText: "",
    gender: "",
    status: "",
    page: 1
}

export const StateContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: defaultState,
    dispatch: () => null
});


type ActionType = {
    type: string,
    payload: string
}

function stateReducer(prevState: InitialStateType, action: ActionType) {
    let updatedState: InitialStateType = prevState;

    switch (action.type) {
        case "DEC_PAGE":
            updatedState = { ...prevState, page: --prevState.page };
            break;
        case "INC_PAGE":
            updatedState = { ...prevState, page: ++prevState.page };
            break;
        case "UPDATE_SEARCH_TEXT":
            updatedState = { ...prevState, searchText: action.payload, page: 1 };
            break;
        case "UPDATE_STATUS":
            updatedState = { ...prevState, status: action.payload, page: 1 };
            break;
        case "UPDATE_GENDER":
            updatedState = { ...prevState, gender: action.payload, page: 1 };
            break;
        case "CLEAR":
            updatedState = {
                gender: "",
                status: "",
                searchText: "",
                page: 1
            }
            break;

        default:
            console.error("function: StateReducer, Error: action property not included");
            break;

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