import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";

import { useState } from 'react';
import {CRUDService, ITEMS} from "../service/CRUDService";


const theme = createTheme();




export default function Products() {

  const saveItemInLocalStorage = (item) =>{

    

    let currentCar = localStorage.getItem("currentCar");

    let currentCarMap = new Map();

    if(currentCar == null){
      createItemInCar(item, currentCarMap);

    }else{

      currentCarMap = new Map(JSON.parse(currentCar));
      if(currentCarMap.get(item.itemId)==null){
        createItemInCar(item, currentCarMap);
      }else{
        let quantity = currentCarMap.get(item.itemId).quantity;
        let itemTuple = {
          item,
          "quantity":quantity+1
        }
        currentCarMap.set(item.itemId, itemTuple)

      }



    }

    let currentCarSerialized = JSON.stringify(Array.from(currentCarMap.entries()));
           console.log(currentCarSerialized);
      localStorage.setItem("currentCar", currentCarSerialized);





  }


  const createItemInCar = (item, currentCarMap) =>{
    
      let itemTuple = {
        item,
        "quantity":1
      }
      currentCarMap.set(item.itemId, itemTuple);
  }

const [currentCards, setCurrentCards] = useState([]);

useEffect(() => {
  CRUDService.getAll(ITEMS).then((items)=>{
      setCurrentCards(items);
  });


});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {currentCards.map((card) => (
              <Grid item key={card.itemId} xs={12} sm={6} md={4}>
                <Card
                  sx={{  display: 'flex', flexDirection: 'column' }}
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
                  <CardActions>
                    <Button size="small" onClick={()=>{
                      saveItemInLocalStorage(card)
                    }}>Add to car</Button>
           
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     
    </ThemeProvider>
  );
}