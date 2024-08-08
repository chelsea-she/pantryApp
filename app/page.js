'use client'
import Image from "next/image";
import Link from 'next/link';
import {useState, useEffect} from 'react'
import {firestore} from '/firebase'
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material'
import {collection, deleteDoc, doc, getDocs, getDoc, setDoc, query} from "firebase/firestore";
import { UserAuth } from './context/AuthContext';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [loading,setLoading] = useState(true);

  const {user} = UserAuth();
  // const getItem = () => {
  //   const searchParams=useSearchParams()
  //   return(searchParams.get('url'))
  // };
  // let imageItemURL=getItem()
  // if !imageInventory.includes(imageItemURL) {
  //   imageInventory.push(imageItemURL)
  // }

  const updateInventory = async () => {
    if(user){
      const snapshot = query(collection(firestore, user.email))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=> {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    }
    }

  const addItem = async (item) => {
    if(user) {
      const docRef = doc(collection(firestore, user.email), item)
      const docSnap = await getDoc(docRef)
  
      if(docSnap.exists()){
        const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity+1})
      }
      else{
        await setDoc(docRef, {quantity: 1})
      }
      await updateInventory()
    }
   
  }

  const removeItem = async (item) => {
    if(user) {
      const docRef = doc(collection(firestore, user.email), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }
    await updateInventory()
    }
    
  }

  const [files, setFiles] = useState([]);
  const fetchFiles = async () => {
    if(user) {
      const listRef = ref(storage, user.email+"/images"); // Specify your directory path here
      const res = await listAll(listRef); // List all items in the directory

      const fileUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setFiles(fileUrls);
    }
  }

  useEffect(() => {
    updateInventory()
    fetchFiles()
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve,50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width='100vw'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      py={3}
      gap={3}>
        {loading ? (
                <Typography>Loading...</Typography>
            ) : user ? (
              <Box
              width='100vw'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              py={3}
              gap={3}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={3}>
        <Button 
          width='200px'
          variant='contained'
          size='large'
          p={2}
          margin-top={3}
          onClick={() => {
            handleOpen()
          }}>
            Add New Item
          </Button>

          <Link href='/camera'>
          <Button 
          width='400px'
          variant='contained'
          size='large'
          p={2}
          margin-top={3}>
            Add New Item with Photo
          </Button></Link>

          <Link href='/openai'>
          <Button 
          width='400px'
          variant='contained'
          size='large'
          p={2}
          margin-top={3}>
            Add New Item with AI
          </Button></Link>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box
            position='absolute'
            top='50%'
            left='50%'
            sx={{
              transform:'translate(-50%,-50%)',
            }}
            width={400}
            bgcolor='white'
            border='2px solid #0000'
            boxShadow={24}
            p={4}
            display='flex'
            flexDirection='column'
            gap={3}>
              <Typography variant="h6">Add Item</Typography>
              <Stack width='100%' direction='row' spacing={2}>
                <TextField 
                  variant='outlined'
                  fullWidth
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value)
                  }}>
                  </TextField>
                  <Button 
                      variant='outlined'
                      onClick={() => {
                        addItem(itemName)
                        setItemName('')
                        handleClose()
                      }}>
                        Add
                    </Button>
              </Stack>
          </Box>
        </Modal>
          <Box
          width='800px'
          height='100px'
          bgcolor='#F2CC8F'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={4}>
            <Typography 
              variant='h2' 
              color='white'>
              Inventory Items
            </Typography>
          </Box>
        <Stack 
          width='100vw' 
          height='300px' 
          space={2} 
          display='flex'
          flexDirection='row' 
          justifyContent='start'
          flexWrap='wrap'
          gap={3}
          px={3}>
          {
            inventory.map(({name,quantity}) => (
              <Box
                key={name}
                display='flex'
                height='200px'
                minWidth='400px'
                maxWidth='400px'
                flexDirection='column'
                alignItems='center'
                justifyContent='space-between'
                p={2}
                bgcolor='#E07A5F'
                // border='2px solid #F2CC8F'
                borderRadius={3}
                padding={5}>
                  <Stack
                    direction='row'
                    spacing={2}>
                  <Typography
                    variant='h4'
                    color='white'
                    textAlign='center'
                    fontWeight='200'>
                      {name.charAt(0).toUpperCase()+name.slice(1)} 
                  </Typography>
                  <Typography
                  variant='h4'
                  color='white'
                  textAlign='center'
                  fontWeight='200'>
                    -- 
                  </Typography>
                  <Typography
                    variant='h4'
                    color='white'
                    textAlign='center'
                    fontWeight='200'>
                      {quantity}
                  </Typography>
                  </Stack>
                  <Stack
                    direction='row'
                    spacing={2}>
                  <Button 
                    variant='contained'
                    color='error'
                    onClick={() => {
                      addItem(name)
                    }}>
                      Add
                    </Button>
                  <Button 
                    variant='contained'
                    color='error'
                    onClick={() => {
                      removeItem(name)
                    }}>
                      Remove
                    </Button>
                    </Stack>
                </Box>
            ))
          }

          {
            files.map((file) => (
              <Box
                display='flex'
                height='400px'
                minWidth='400px'
                maxWidth='400px'
                flexDirection='column'
                alignItems='center'
                justifyContent='space-between'
                p={2}
                bgcolor='#E07A5F'
                // border='2px solid #F2CC8F'
                borderRadius={3}
                padding={5}
                key={file.url}>
                  <img 
                    src={file.url}
                    alt={file.name}
                    style={{ width: 'auto', height: '200px'}}
                    border-radius={3}
                  />
                  
                  <Typography
                    variant='h4'
                    color='white'
                    textAlign='center'
                    fontWeight='200'>
                      1
                  </Typography>

                  <Stack
                    direction='row'
                    spacing={2}>
                  <Button 
                    variant='contained'
                    color='error'
                    onClick={() => {
                      addItem()
                    }}>
                      Add
                    </Button>
                  <Button 
                    variant='contained'
                    color='error'
                    onClick={() => {
                      removeItem(file.name)
                    }}>
                      Remove
                    </Button>
                    </Stack>
                </Box>
            ))
          }
        </Stack>
        </Box>) : (
          <Typography
          color='#3D405B'
          fontWeight='800'
          variant='h5'>Please log in to access your inventory.</Typography>
      )}
    {/* <Typography variant="h1">Inventory Management</Typography> */}
    </Box>
  )
}
