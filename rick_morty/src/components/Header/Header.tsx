import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './Header.css';

interface IProps {
    title: string;
}

export const Header: React.FC<IProps> = ({ title }) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
