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
                <Typography component="div" color="text.secondary" variant="body2">
                    first appeared : {characterData.episode[0]}
                    <Divider variant="middle" />
                    last appeared : {characterData.episode[1]}
                </Typography>
            </CardContent>
        </Card>
    )
}
