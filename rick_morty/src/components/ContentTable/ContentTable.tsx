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
import { TableFooter, TablePagination } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';



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


const ContentTable: React.FC<ITableProps> = ({ headers, characters}) => {
    const [chosenCharacter, SetChosenCharacter] = React.useState<ICharacter | null>(null);
    const [open, setOpen] = React.useState(false);


    const handleRowClick = (e: any): void => {
        const chosenId = e.target.parentNode.id;
        let chosen = characters.find(character => character.id as number == chosenId);
        if (chosen) SetChosenCharacter(chosen);
        setOpen(true);
    }

    // Avoid a layout jump when reaching the last page with empty rows.

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
            <>
                {characters.map((character: ICharacter) => (
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
                ))}
            </>
        )
    }

    return (
        <>
            <Paper elevation={3} style={{ margin: "1rem" }}>
                <TableContainer style={{ maxHeight: "70vh" }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="custom pagination table">
                        <TableHeader />
                        <TableBody>
                            <Charecters />
                        </TableBody>
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