'use client'
import React, {useState,useEffect,createContext, useContext} from 'react';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material';
import {CldImage, CldUploadButton} from 'next-cloudinary';
import Link from 'next/link';
import {firestore} from '@/firebase'
import {collection, deleteDoc, doc, getDocs, getDoc, setDoc, query} from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
// const answer=createContext();

const Cloudinary = () => {
    const {user} = UserAuth()
  const [uploadResults,setUploadResults] = useState();
  const [item,setItem] = useState("");

//   console.log('result',uploadResults);
const addItem = async (item) => {
      const docRef = doc(collection(firestore, user.email), item)
      const docSnap = await getDoc(docRef)
        await setDoc(docRef, {quantity: 1})
   
  }
  
  if (uploadResults?.info?.detection?.object_detection?.data?.coco?.tags) {
    const itemTags = uploadResults?.info?.detection?.object_detection?.data?.coco?.tags;
    const tag = Object.keys(itemTags)[0];
    if (tag!=item){
        // answer=tag
        addItem(tag)
        setItem(tag)
        // setContext()
    }
  }
  

  const handleOnUpload = (result,widget) => {
    setUploadResults(result.info);
    widget.close();
    // console.log('widget',widget);
  }

  return(
    <Box
      width='100vw'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      py={5}
      gap={3}
      >
      {uploadResults?.public_id && (
        <CldImage 
        width='467'
        height='313'
        src={uploadResults?.public_id}
        alt='Chelsea She'/>
      )}
      
      {item ? (
        <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        gap={3}>
        <Typography
        color='#3D405B'
        variant='h4'
        fontWeight='800'>
        {item}
      </Typography>
      <Link href={{
        pathname: "/",
        query: {
            url: uploadResults?.public_id
        }
        }}>
      <Button
          variant='contained'
          size='large'
          color='success'
          >
          done    
      </Button>
  </Link>
  </Box>
      ) : (
        <Typography
        color='#3D405B'
        variant='h4'
        fontWeight='800'>
      </Typography>
      )}

        <CldUploadButton 
          uploadPreset='ri0js8rs'
          onSuccess={handleOnUpload}
          // background-color='#3D405B'
          // color='white'
          // border='none'
          // width='100px'
          // height='50px'
          // padding={2}
          // border-radius={2}
          // cursor='pointer'
          />
      </Box>
  )
}

export default Cloudinary;

// const setContext = ({children}) => {
//     return (
//         <answer.Provider value={{item,setItem}}>
//         {children}
//         </answer.Provider>
//     )
//   }

// export const imageClassification = () => {
//     return useContext(answer)
// }