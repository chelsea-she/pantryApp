'use client'
import React, {useState,useEffect} from 'react';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material';
import {CldImage, CldUploadButton} from 'next-cloudinary';
import Cloudinary from './imageClassification';

const Page = () => {

    return(
      <Box>
        <Cloudinary/>
      </Box>
    )
}

export default Page

