// video used: https://www.youtube.com/live/TwFDBIzRqPs?si=JFJN3tb4h91jFj5o 
//upload image to firebase: https://youtu.be/nMgMZ5rZfe0?si=rRxeQterZ_2aU8OO 
import React, {useEffect,useState,useRef} from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';
import 
  {Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Button
  } from '@mui/material';
import { storage } from '/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Image from "next/image";
import { UserAuth } from '../context/AuthContext';

const videoConstraints = {
    width:540,
    facingMode:'environment'
}

const Camera = () => {

    const {user} = UserAuth();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve,50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    const webcamRef = useRef(null)
    const [url,setUrl] = useState(null)
    const capturePhoto=React.useCallback(async() => {
        const imageSrc = webcamRef.current.getScreenshot()
        setUrl(imageSrc)
    },[webcamRef])

    const onUserMedia = (e) => {
        console.log(e)
    }

    const [imageUrl, setImageUrl] = useState("")
    const randomNums = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let result = '';
        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters[randomIndex];
        return result
  }
    }
    const uploadFileToFirebase = async () => {
        if(user) {
            try {
                // console.log(url)
                const letters=await randomNums()
                const storageRef = await ref(storage,user.email+"/images/"+letters);
                await uploadString(storageRef, url, 'data_url')
                const urlImg = await getDownloadURL(storageRef)
                setImageUrl(urlImg)
                // console.log("downloadable url >>>", url);
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            p={5}>
        <Webcam 
            ref={webcamRef}
            audio={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            mirrored={true}
        />
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            gap={2}
            p={2}>
            <Button variant='outlined' onClick={capturePhoto}>Capture</Button>
            <Button variant='outlined' onClick={() => setUrl(null)}>Refresh</Button>
        </Box>

        {url && (
            <Box
                gap={2}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'>
                <img src={url} alt="Screenshot"/>
                <Link href="/">
                <Button variant='outlined' color='success' onClick={uploadFileToFirebase}>Done</Button>
                </Link>
            </Box>
        )}
        </Box>
    )
}

export default Camera;