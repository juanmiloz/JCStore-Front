import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';


import { CRUDService, ORDERS } from "../service/CRUDService";

const theme = createTheme();

const currentCar = localStorage.getItem("currentCar");
const currentCarMap = new Map(JSON.parse(currentCar));

export default function NewOrder() {

    const [cards, setItems] = useState(currentCarMap)
    const card = {
        name: "Articulo X",
        description: "Descripcion de articulo X",
        price: 100.0,
        itemId: "1",
        url: "https://www.img2link.com/images/2022/12/02/62c7b1836f078da0f211f11a3d68eee8.jpg"
    }

    const getCardItem = (item) => {
        console.log(item)
    }

    return (
        <div className="NewOrder">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Create Order
                        </Typography>
                        <Typography component="p">
                            Items that you added to the car:
                        </Typography>
                    </Box>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {[{}].map((item) => (
                                <Grid item key={card.itemId} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"

                                            image={card.url}
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <strong>{card.name}</strong>
                                            </Typography>
                                            <Typography>
                                                {card.description}
                                            </Typography>
                                            <Typography>
                                                <strong>${card.price}</strong>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Container>
            </ThemeProvider>
        </div>
    );
}