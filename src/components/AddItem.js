import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AddBoxIcon from '@mui/icons-material/AddBox';


import {CRUDService, ITEMS} from "../service/CRUDService";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();


export default function AddItem() {

  const handleSaveItem = async (event) => {

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newItem = {
      "name":data.get('name'),
      "description":data.get('description'),
      "price": data.get("price"),
    }

    //Post an newItem using CRUDService
    let reponse = await CRUDService.post(newItem, ITEMS);
    //Get all items using CRUDService
    console.log(CRUDService.getAll(ITEMS));

    //Post an newuser using CRUDService
    //CRUDService.post(newUser, USERS);
    //Get all users using CRUDService
    //console.log(CRUDService.getAll(USERS));




  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <AddBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSaveItem} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
          
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Short description"
                  name="description"
               
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="Price"
             
                />
              </Grid>
        
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id='saveBtn'
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}



/*const createUser = async () => {

  let url = "http://localhost:8080/users"

  let nameUser
  let emailUser
  let passwordUser
  let addresUser
  let phoneUser
  let roleIdUser

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify({
      "name": idMother,
      "email": idFather,
      "password": nameTiger,
      "addres": genderTiger,
      "phone": weightTiger,
      "roleId": ageTiger,
    })
  })
  const answer = await res.json()
}*/