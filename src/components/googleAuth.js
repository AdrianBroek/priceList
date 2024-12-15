import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged  } from 'firebase/auth';
// import { auth,  } from '../firebase';
import { setUserData } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// mui
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';import SendIcon from '@mui/icons-material/Send';
import Profile from '../layout/profile';

const GoogleAuth = () => {
  const dispatch = useDispatch()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const userData = useSelector(state => state.userData)

  const signInGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
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