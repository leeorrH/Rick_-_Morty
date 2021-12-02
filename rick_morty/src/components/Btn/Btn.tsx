import { Button } from '@mui/material';
import * as React from 'react';

interface IBtnProps {
    text:string;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Btn: React.FC<IBtnProps> = ({text, onClickHandler}) => {
  return (
    <Button variant="contained" onClick={onClickHandler}>{text}</Button>
  );
};

export default Btn;
