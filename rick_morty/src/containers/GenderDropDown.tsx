import * as React from 'react';
import DropDown from '../components/DropDown/DropDown';


const GenderDropDown: React.FC = () => {

    const genders : string[] = ["Male","Female","Unknown","Genderless"];

    return (
        <DropDown options={genders} placeHolderText="Gender" />
    );
};

export default GenderDropDown;
