import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import { ICharacter } from '../ContentTable/ContentTable'

interface Props {
    characterData: ICharacter;
}

export const CharacterInfo: React.FC<Props> = ({ characterData }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                image={characterData.image}
                alt={characterData.name}
                height="250"
            />
            <CardContent>
                <Typography color="text.secondary" variant="body2">
                    first appeared : {characterData.origin}
                    <Divider variant="middle" />
                    last appeared : {characterData.location}
                </Typography>
            </CardContent>
        </Card>
    )
}
