import { Button } from '@mui/material';
import * as React from 'react';

interface IBtnProps {
    text:string;
    disable?: boolean;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Btn: React.FC<IBtnProps> = ({text, onClickHandler, disable = false}) => {
  return (
    <Button disabled = {disable} variant="contained" onClick={onClickHandler}>{text}</Button>
  );
};

export default Btn;
