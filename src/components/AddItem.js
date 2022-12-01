import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AddBoxIcon from '@mui/icons-material/AddBox';
import storage from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { useState } from 'react';


import {CRUDService, ITEMS} from "../service/CRUDService";
import { v4 as generateRandomUUID } from 'uuid';


const theme = createTheme();
const DEFAULT_IMAGE_LINK = 'https://firebasestorage.googleapis.com/v0/b/jc-store-9e701.appspot.com/o/default.jpeg?alt=media&token=2acf5f7f-9755-4e92-8c54-f76ed9024c82';
const ITEM_SAVED_MSG = "the item has been successfully saved!"


export default function AddItem() {

  //We set the default image link
  const [currentImageFile, setImageFile] = useState(DEFAULT_IMAGE_LINK);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleInputFileChange = (event) => {
    // Seting the new image...
    setImageFile(event.target.files[0]);

  };

  const handleSaveItem = async (event) => {

    event.preventDefault();

     console.log(currentImageFile);

    const data = new FormData(event.currentTarget);
    const newItem = {
      "name":data.get('name'),
      "description":data.get('description'),
      "price": data.get("price"),
      "url":DEFAULT_IMAGE_LINK
    }

    if(currentImageFile === DEFAULT_IMAGE_LINK){

      //Posting an item without any image
      let reponse =  CRUDService.post(newItem, ITEMS).then((response)=>{

        alert(ITEM_SAVED_MSG);
      });

      console.log(reponse)

    }else{
      //Posting an item with an image

      // First we need to upload the item image to the store before saving
      // the user in the backend to get the image url
      const itemImageId = generateRandomUUID();
      const storageRef = ref(storage, 'itemsImages/'+itemImageId);

      uploadBytes(storageRef, currentImageFile).then((snapshot) => {

        getDownloadURL(storageRef).then((url) => {

          newItem.url = url;
          console.log(url);
          CRUDService.post(newItem, ITEMS).then((response)=>{
            setImageFile(DEFAULT_IMAGE_LINK);
            alert(ITEM_SAVED_MSG);
          });
         
        });
       
      });


    }

  
 
  





    
    //Post an newItem using CRUDService
    //let reponse = await CRUDService.post(newItem, ITEMS);
;



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
              <Grid item xs={12}>
                  <div className="row row--centered">
                      <p style={{"marginRight": "10px"}}>Add image</p>
                      <input type="file" accept="image/*" onChange={handleInputFileChange}/>
                  </div>
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