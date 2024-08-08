'use client'
import React, {useState,useEffect} from 'react'
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material'
import AllCameras from './AllCameras'
import Camera from './Camera'

const page = () => {
    return(
        <Box>
            <Camera/>
        </Box>
    )
}

export default page