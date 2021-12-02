import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react';
import { StateContext } from '../../store/store';

interface IProps {
    placeHolderText: string;
    options: string[];
}

const DropDown: React.FC<IProps> = ({ placeHolderText, options }) => {

    const { dispatch, state } = React.useContext(StateContext);
    const [option, setOption] = React.useState('');

    React.useEffect(() => {
        if (!state.gender.length && !state.status.length) {
            setOption('');
        }
    }, [state]);

    const handleChange = (event: SelectChangeEvent) => {
        let optionText = event.target.value as string
        setOption(optionText);
        dispatch({
            type: "UPDATE_" + placeHolderText.toUpperCase(),
            payload: optionText
        })
    };

    // need to put the selected item from store ! 
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{placeHolderText}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label = {placeHolderText}
                onChange={handleChange}
                displayEmpty
            >

                {
                    options.map((val, index) =>
                        <MenuItem value={val} key={index}>{val}</MenuItem>
                    )
                }
            </Select>
        </FormControl>

    );
};

export default DropDown;
