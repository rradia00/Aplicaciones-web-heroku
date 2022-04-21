import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rebeca Radío
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = (event) => {

const navigate = useNavigate();

const[vector, setVector]=useState({
    email: "",
    password: "",
  });

const setEmail = listener => {
  const { name, value } = listener.target;
  setVector({ ...vector, [name]: value });
};

const setPass = listener => {
  const { name, value } = listener.target;
  setVector({ ...vector, [name]: value });
};

  const HandleSubmit = () => {
    if(vector.email!=="" && vector.password!==""){
      sessionStorage.setItem("Usuario", vector.email);
      var axios = require("axios").default;
      axios
      .post(
        "http://localhost:3016/login",
        {
            usuario: vector.email,
            clave: vector.password
        })
        .then((response) => {
          if (response.data === vector.email) {
            navigate('/'+vector.email+'/notes');
          }else{
            alert("Uiiii! uiiiii! uiiiii! ¡Alarma! ¡Alarma!, los rusos intentan colarse. Pues eso, que la contraseña o el correo no se encuentra en la base de datos")
          }
        }
      );
    }else{
      alert("falta un dato");
    }
    
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={vector.email}
              onChange={setEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={vector.password}
              onChange={setPass}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;