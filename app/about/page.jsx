import React from 'react'
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material'

const page = () => {
    return (
        <Box
            width='100vw'
            display='flex'
            justifyContent='center'
            py={5}>
            <Box
                width='500px'
                height='300px'
                borderRadius={3}
                bgcolor='#3D405B'
                display='flex'
                alignItems='center'
                justifyContent='center'
                p={5}
                >
            <Typography
                color='#F4F1DE'
                fontWeight='800'
                variant='h5'>
                Welcome to your pantry inventory! In here, you can keep track of all the items you have in an easy, flawless way. Press the home button to access your pantry inventory. Hope you have fun! 📝
            </Typography>
            </Box>
            
        </Box>
    )
}

export default page