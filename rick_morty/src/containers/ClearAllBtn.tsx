import * as React from 'react';
import Btn from '../components/Btn/Btn';
import { StateContext } from '../store/store';

const ClearAllBtn: React.FC = () => {
    const {dispatch} = React.useContext(StateContext);
    const clearAllFilters = () : void => { 
        dispatch({
            type: "CLEAR"
        })
    }

    return (
        <Btn
            text="Clear All"
            onClickHandler={ clearAllFilters }
        />
    );
};

export default ClearAllBtn;
