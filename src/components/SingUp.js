import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CRUDService, USERS } from "../service/CRUDService";
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    /*
    let url = "http://localhost:8080/users"
    var res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({
        "name": data.get('name'),
        "age": data.get('age'),
        "email": data.get('email'),
        "password": data.get('password'),
        "address": data.get('address'),
        "phone": data.get('phone'),
        "name": (data.get('name') === "") ? null : data.get('name'),
        "age": (data.get('age') === "") ? null : data.get('age'),
        "email": (data.get('email') === "") ? null : data.get('email'),
        "password": (data.get('password') === "") ? null : data.get('password'),
        "address": (data.get('address') === "") ? null : data.get('address'),
        "phone": (data.get('phone') === "") ? null : data.get('phone'),
        "roleId": "7832c0fe-d0f0-425a-8d36-d32693c57aff",
      })
    })
    console.log(res.status)*/
    const newUser = {
      "name": data.get('name'),
      "age": data.get('age'),
      "email": (data.get('email') === "") ? null : data.get('email'),
      "password": data.get('password'),
      "address": data.get('address'),
      "phone": (data.get('phone') === "") ? null : data.get('phone'),
      "roleId": "7832c0fe-d0f0-425a-8d36-d32693c57aff",
    }

    await CRUDService.post(newUser, USERS).then(async (res) => {
      //An easy way (maybe not the best) to check if the post request succeeded 
      //since the method returns either the user that has just been saved or the error
      var response = await res
      console.log(response)
      if (newUser.email === response.email) {
        navigate('/')
      } else {
        //mantener en la misma pantalla
      }
    });



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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id='submitBtn'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
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