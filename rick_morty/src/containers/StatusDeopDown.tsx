import * as React from 'react';
import DropDown from '../components/DropDown/DropDown';


const StatusDropDown: React.FC = () => {

    const statuses : string[] = ["Alive","Dead","Unknown"];

    return (
        <DropDown options={statuses} placeHolderText="Status" />
    );
};

export default StatusDropDown;
