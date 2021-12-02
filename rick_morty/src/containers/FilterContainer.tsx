import { Grid } from '@mui/material'
import React from 'react'
import SearchInput from '../components/SearchInput/SearchInput'
import ClearAllBtn from './ClearAllBtn'
import GenderDropDown from './GenderDropDown'
import StatusDropDown from './StatusDeopDown'
import CSS from 'csstype';

export const FilterContainer: React.FC = () => {
    const paddingItem: CSS.Properties = {
        padding: '1rem',
    };

    const btnStyle: CSS.Properties = {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column"
    };

    return (
        <Grid container style={paddingItem} spacing={2}>
            <Grid item xs={12}>
                <SearchInput placeHolderText="search" ></SearchInput>
            </Grid>
            <Grid item xs={5}>
                <GenderDropDown />
            </Grid>
            <Grid item xs={5}>
                <StatusDropDown />
            </Grid>
            <Grid item xs={2} style={btnStyle} >
                <ClearAllBtn />
            </Grid>
        </Grid>
    )
}