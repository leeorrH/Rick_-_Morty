import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CSS from 'csstype';
import { BaseModal } from '../Modal/BaseModal';
import { CharacterInfo } from '../CharacterInfo/CharacterInfo';



export interface ICharacter {
    id: number;
    image: string,
    name: string;
    origin: string;
    location: string;
    status: string;
    species: string;
    gender: string;
}

interface ITableProps {
    headers: string[];
    characters: ICharacter[];
}


const ContentTable: React.FC<ITableProps> = ({ headers, characters }) => {
    const [chosenCharacter, SetChosenCharacter] = React.useState<ICharacter | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleRowClick = (e: any): void => {
        const chosenId = e.target.parentNode.id;
        let chosen = characters.find(character => character.id as number == chosenId);
        if (chosen) SetChosenCharacter(chosen);
        setOpen(true);
    }

    const TableHeader: React.FC = () => {
        return (
            <TableHead>
                <TableRow key="headers">
                    {
                        headers.map((val, index) => {
                            return (
                                <TableCell key={val}>{val}</TableCell>
                            )
                        })
                    }
                </TableRow>
            </TableHead>
        );
    }

    const Charecters: React.FC = () => {
        const imageStyle: CSS.Properties = {
            maxWidth: "50px",
            borderRadius: "50%"
        };
        return (
            <TableBody>
                {
                    characters.map((character) => (
                        <TableRow
                            key={character.id}
                            id={`${character.id}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover={true}
                            onClick={handleRowClick}
                        >
                            <TableCell align="left"><img style={imageStyle} src={character.image} /></TableCell>
                            <TableCell align="left">{character.name}</TableCell>
                            <TableCell align="left">{character.origin}</TableCell>
                            <TableCell align="left">{character.status}</TableCell>
                            <TableCell align="left">{character.species}</TableCell>
                            <TableCell align="left">{character.gender}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        );
    }

    return (
        <>
            <Paper elevation={3} style={{ margin: "1rem" }}>
                <TableContainer style={{ maxHeight: "70vh" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHeader />
                        <Charecters />
                    </Table>
                </TableContainer>
            </Paper>
            {
                chosenCharacter != null ?
                    (<BaseModal
                        openModal={open}
                        setOpenModal={setOpen} >
                        <CharacterInfo characterData={chosenCharacter} />
                    </BaseModal>)
                    :
                    null
            }
        </>
    );
};

export default ContentTable;