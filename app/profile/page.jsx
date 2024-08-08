'use client'
import React, {useState,useEffect} from 'react'
import { UserAuth } from '../context/AuthContext';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material'

const Page = () => {
    const {user} = UserAuth()
    const [loading,setLoading] = useState(true);

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
            justifyContent='center'
            py={5}>
                {loading ? (
                <Typography>Loading...</Typography>
            ) : user ? (
                <Typography
                color='#3D405B'
                fontWeight='800'
                variant='h5'>Welcome, {user.displayName}. You are logged in.</Typography>
            ) : (
                <Typography
                color='#3D405B'
                fontWeight='800'
                variant='h5'>Log in to see this page - protected route.</Typography>
            )}
        </Box>
            
    )
}

export default Page;