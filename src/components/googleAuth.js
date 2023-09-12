import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged  } from 'firebase/auth';
// import { auth,  } from '../firebase';
import { useEffect, useState } from 'react';
import { setUserData } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/userSlice';
import { resetPriceList } from '../store/priceSlice';
// mui
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GoogleIcon from '@mui/icons-material/Google';import SendIcon from '@mui/icons-material/Send';


const GoogleAuth = () => {
  const dispatch = useDispatch()
  const auth = getAuth();
  const [user, setUser] = useState(null)
  const provider = new GoogleAuthProvider();
  const userData = useSelector(state => state.userData)
  const {priceTable} = useSelector(state => state.priceList)

  const signInGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // console.log(token)
      // console.log(credential)
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
      }))
      // console.log(auth)
      setUser(auth.currentUser)
      // console.log(userLogged)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      if(error){
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
     
    });

    useEffect(()=> {
      // console.log(auth.currentUser)
      // console.log(user)
    }, [user])

    const logoutCurrentUser = () => {
      auth.signOut()
      // console.log(auth)
      setUser(auth.currentUser)
      // console.log(user)
      dispatch(logoutUser())
      dispatch(resetPriceList())
    }
      
    return (
        <>
        {userData.logged ? 
          <Button onClick={()=>logoutCurrentUser()} sx={{margin: '1rem'}} variant="contained" endIcon={<ExitToAppIcon />}>
            Logout
          </Button>
          : 
          <Button onClick={signInGoogle} sx={{margin: '1rem'}} variant="contained" endIcon={<GoogleIcon />}>
            Login
          </Button>
        }    
        </>
    )
}

export default GoogleAuth