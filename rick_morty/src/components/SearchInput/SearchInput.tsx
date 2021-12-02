import { TextField } from '@mui/material';
import * as React from 'react';
import useDebounce from '../../customHooks/CustomDebounce';
import { StateContext } from '../../store/store';

interface IProps {
  placeHolderText: string;
}

const SearchInput: React.FC<IProps> = ({ placeHolderText }) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const debouncedValue = useDebounce(searchText, 750); 
  const {dispatch} = React.useContext(StateContext);
  React.useEffect(() => {
    dispatch({
      type: "UPDATE_SEARCH_TEXT",
      payload: debouncedValue
    });
  }, [debouncedValue])

  return (
      <TextField
        id="outlined-basic"
        label={placeHolderText}
        placeholder={placeHolderText}
        fullWidth
        onChange={(e) => setSearchText(e.target.value)}
      >
      </TextField>
  );
};

export default SearchInput;
