'use client'
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material'
const Navbar = () => {
    const {user, googleSignIn, logOut} = UserAuth();
    const [loading,setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try{
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve,50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
    <Box
        width='100vw'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        height='{10}'
        alignItems='center'
        bgcolor='#81B29A'
        p={3}>
        <Box 
            display='flex'
            maxWidth='200px'>
            <Link href='/'>
                <Button
                    variant='text'
                    size='large'
                    color='success'>
                    home
            </Button></Link>

            <Link href='/about'>
                <Button
                    variant='text'
                    size='large'
                    color='success'>
                    about
            </Button></Link>
            <Link href='/profile'>
                <Button
                    variant='text'
                    size='large'
                    color='success'>
                    profile
            </Button></Link>
            </Box>
          <Typography 
            variant='h2'
            color='white'
            fontWeight='300'>
            pantry inventory
          </Typography>

          {loading ? null : !user ? (<Box
            minWidth='200px'>
          <Button
            variant='text'
            size='large'
            color='success'
            onClick={() => {
                handleSignIn()
            }}>
              log in
          </Button>
          <Button
            variant='text'
            size='large'
            color='success'
            onClick={() => {
                handleSignIn()
            }}>
              sign up
          </Button>
          </Box>) : (
            <Box
                minWidth='200px'
                display='flex'
                flexDirection='column'
                justifyContent='end'>
                <Typography 
                    color='#3D405B'
                    variant='p'>
                        Welcome, {user.displayName}
                </Typography>
                <Button 
                    variant='text'
                    size='large'
                    color='success'
                    onClick={handleSignOut}>
                        sign out
                </Button>
            </Box>
          )}
          
        </Box>
    );
};

export default Navbar