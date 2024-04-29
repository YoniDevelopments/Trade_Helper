"use client";

import { signInDataSave } from '@/redux/features/auth';
import { AuthController } from '@/utils/controller/authController';
import { Box, Button, Grid, Snackbar, Stack, Typography, colors } from '@/utils/theme/muiLib';
import { signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {

    //const dispatch = useDispatch();

    const [ isSignInSuccessSnackbarOpen, setIsSignInSuccessSnackbarOpen ] = useState(false);
    const [ isSignInErrorSnackbarOpen, setIsSignInErrorSnackbarOpen ] = useState(false);

    const signInHandler = () => {
        AuthController.signIn().then((response) => {
            //dispatch(signInDataSave(response));
            setIsSignInSuccessSnackbarOpen(true);
        }).catch((error) => {
            setIsSignInErrorSnackbarOpen(true);
            console.log(error);
        });
    }

    return (
      <>

          <Grid className='main-gradient sub-item' container>
              <Grid container item xs={12} alignItems='flex-start' justifyContent='center'>
                  <Box>
                      <Stack spacing={4} justifyContent='center' alignItems='center'>
                          <Box>
                              <Typography variant='h1' color='text.primary' align='center' style={{ color: 'black' }}>
                                  <b>Welcome to The Trade Helper APP</b>
                              </Typography>
                          </Box>
                          <Box>
                              <Typography variant='h4' color='text.primary' align='center'>
                                  <b>Please Sign In!</b>
                              </Typography>
                          </Box>
                          <Button variant='contained' size='large' onClick={signInHandler} style={{ backgroundColor: 'red', color: 'white' }}>
                              Sign in
                          </Button>
                      </Stack>
                  </Box>
              </Grid>
          </Grid>
  
          <Snackbar
              open={isSignInSuccessSnackbarOpen}
              message="User sign in successfully"
          />
  
          <Snackbar
              open={isSignInErrorSnackbarOpen}
              message="Something went wrong while signing in"
          />
      </>
  )
}
