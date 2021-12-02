import { TextField } from '@mui/material';
import * as React from 'react';

interface IProps {
  placeHolderText: string;
}

const SearchInput: React.FC<IProps> = ({ placeHolderText }) => {

  //add function for filtering

  return (
      <TextField
        id="outlined-basic"
        label={placeHolderText}
        placeholder={placeHolderText}
        fullWidth
      >
      </TextField>
  );
};

export default SearchInput;
