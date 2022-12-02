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
import { useState, useLayoutEffect } from 'react';


import { CRUDService, ORDERS } from "../service/CRUDService";

const theme = createTheme();

const ORDER_SAVED_MSG = "The order has been successfully saved!"

export default function NewOrder() {

    const [itemsQuantity, setItemsQuantity] = useState([])
    const [finalOrder, setFinalOrder] = useState(null)

    const currentCar = localStorage.getItem("currentCar");
    const currentCarMap = new Map(JSON.parse(currentCar));

    const carMapToList = (map) => {
        var carList = []
        for (let values of map.values()) {
            carList.push(values)
        }
        return carList
    }

    const createOrder = () => {
        const order = {
            "status": "PENDING",
            "userId": JSON.parse(localStorage.getItem("currentUser")).id,
            "orderItems": itemsQuantity
        }

        let response = CRUDService.post(order, ORDERS).then((response)=>{
            alert(ORDER_SAVED_MSG)
        })

        localStorage.setItem("currentCar", null)
        setFinalOrder(response)
    }



    useLayoutEffect(() => {
        setItemsQuantity(carMapToList(currentCarMap))
    }, []);


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
                            {itemsQuantity.map((itemQuantity) => (
                                <Grid item key={itemQuantity.item.itemId} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"

                                            image={itemQuantity.item.url}
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <strong>{itemQuantity.item.name}</strong>
                                            </Typography>
                                            <Typography>
                                                {itemQuantity.item.description}
                                            </Typography>
                                            <Typography>
                                                <strong>${itemQuantity.item.price}</strong>
                                            </Typography>
                                            <Typography>
                                                <strong>Quantity: {itemQuantity.quantity}</strong>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            id='saveBtn'
                            onClick={createOrder}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Order now
                        </Button>

                    </Box>
                    {finalOrder != null &&
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Total: {finalOrder.total}
                        </Typography>
                        <Typography component="p">
                            Your order has been confirmed
                        </Typography>
                    </Box>
                    }
                </Container>
            </ThemeProvider>
        </div>
    );
}