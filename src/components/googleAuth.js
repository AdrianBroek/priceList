import React, {useEffect} from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setUserData } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// mui
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Profile from '../layout/profile';

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const userData = useSelector(state => state.userData);

  const signInGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const userLogged = result.user;
      
      dispatch(setUserData({
        id: userLogged.uid,
        accessToken: userLogged.accessToken,
        displayName: userLogged.displayName,
        email: userLogged.email,
        createdAt: userLogged.metadata.createdAt,
        photoUrl: userLogged.photoURL,
        logged: true
      }));
      localStorage.setItem('accessToken',userLogged.accessToken);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      if(error){
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
     
    });

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          dispatch(setUserData({
            id: user.uid,
            accessToken: user.accessToken,
            displayName: user.displayName,
            email: user.email,
            createdAt: user.metadata.createdAt,
            photoUrl: user.photoURL,
            logged: true
          }));
        }
      });
      return () => unsubscribe();
    }, []);
      
    return (
        <>
        {userData.logged ? 
          <Profile />
          : 
          <Button onClick={signInGoogle} sx={{margin: '1rem'}} variant="contained" endIcon={<GoogleIcon />}>
            Login
          </Button>
        }    
        </>
    )
}

export default GoogleAuth