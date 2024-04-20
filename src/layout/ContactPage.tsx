import {useForm, SubmitHandler} from 'react-hook-form';
import React, {useEffect} from 'react';
// firebase db
import { db } from '../firebase';
import { collection, onSnapshot, setDoc, doc} from 'firebase/firestore';

import {v4 as uuidv4} from 'uuid';

import { callAlert } from '../store/alertSlice';

// mui
import Container from '@mui/material/Container';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
// redux
import { useAppDispatch, useAppSelector } from '../hooks';


type Inputs = {
    email: string,
    firstName: string,
    lastName: string,
    content: string,
    title: string,
    phone: string,
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "100%",
}));

const ContactForm = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.userData);
    // hook form
    const {
        register, 
        handleSubmit, 
        setError,
        watch, 
        formState: {errors, isSubmitting}
    } = useForm<Inputs>({
        defaultValues: {
            email: userData.email !== "" ? userData?.email : "e-mail@domain.com",
            firstName: userData.displayName !== "" ? userData?.displayName.split(" ")[0] : "First Name",
            lastName:  userData.displayName !== "" ? userData?.displayName.split(" ")[1] : "Last Name",
        }
    })

    // firestore db
    useEffect(()=> {
        onSnapshot(collection(db, "contact-form"),(snapshot)=>{
            // console.log(snapshot.docs.map((doc: any)=> doc.data()))
        });
    },[])

    // send data do db firestore
    const addData = async (
        name:string,email: string, 
        message: string, phone: string, title: string
    ) => {
        const docRef = doc(db, "contact-form",uuidv4());
        const payload = {
            name: name,
            date: Date.now(),
            email: email,
            message: message,
            phone: phone,
            title: title
        };
        await setDoc(docRef, payload);

    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            // console.log(data)
            await addData(
                data.firstName +' '+ data.lastName,
                data.email,
                data.content,
                data.phone,
                data.title,
            );
            // throw new Error();
            dispatch(callAlert([{text: 'We got your message!', type: 'success', id: uuidv4()}]))
        } catch (error) {
            setError("root", {
                message: "This email is already taken"
            })
            dispatch(callAlert([{text: errors.root ? errors.root?.message : 'Something went wrong', type: 'error', id: uuidv4()}]))
            
        }
    }


    // console.log(watch("email"))

    return (
        
        <Container maxWidth="sm" sx={{marginTop: '5rem'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={2} sx={{marginBottom: 10, paddingTop: 2}}>
            <h1>Contact form</h1>
            <p>Saw some errors? Have a questions? Please tell us about it!</p>
            <Grid marginTop={10} container spacing={0}>
                <Grid 
                xs={12}
                sm={6}
                item 
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                        <TextField
                        id="outlined-multiline-static" label="First Name"
                        sx={{width: "100%"}} type="text" {...register("firstName", {
                            required: "First name is required",
                            pattern: /^[A-ZŁ][a-zżóźćęłąś]+$/,
                            minLength: {
                                value: 5,
                                message: "First name must have at least 5 chars."
                            }
                        })}/>
                    </Item>
                </Grid>
                <Grid 
                xs={12}
                sm={6}
                item 
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                        <TextField
                        id="outlined-multiline-static" label="Last Name"
                        sx={{width: "100%"}} type="text" {...register("lastName", {
                            required: "Last name is required",
                            pattern: /^[A-ZŁŻ][a-zżóźćęłąś]+$/,
                            minLength: {
                                value: 2,
                                message: "Last name must have at least 2 chars."
                            }
                        })}/>  
                    </Item>
                
                </Grid>
                {errors.firstName?.message && (
                    <Grid 
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        {errors.firstName && (
                            <p style={{color: "#ff0000"}}>{errors.firstName.message}</p>
                        )}
                    </Grid>
                )}
                {errors.lastName?.message && (
                    <Grid 
                    height="auto"
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        <p style={{color: "#ff0000"}}>{errors.lastName.message}</p>
                    </Grid>
                )}
                <Grid 
                xs={12}
                sm={6}
                item 
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                        <TextField
                        id="outlined-multiline-static" label="E-mail"
                        sx={{width: "100%"}} type="text" {...register("email", {
                            required: "Email is required",
                            // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            validate: (value) => {
                                if(!value.includes("@")) {
                                    return "Email must include @"
                                }
                                if(!value.includes(".")) {
                                    return "Email must include ."
                                }
                                return true;
                            },
                        })}/>
                        
                    </Item>
                </Grid>
                <Grid 
                xs={12}
                sm={6}
                item 
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                        <TextField
                        id="outlined-multiline-static" label="Phone number"
                        sx={{width: "100%"}} placeholder='your phone number' type="number" 
                        {...register("phone", {
                            required: "Phone number is required",
                            // pattern: /^[0-9]+$/,
                            minLength: {
                                value: 9,
                                message: "phone number must have at least 9 numbers."
                            }
                        })}/>
                    </Item>
                </Grid>
                {errors.email?.message && (
                    <Grid 
                    height="auto"
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        <p style={{color: "#ff0000", fontSize: 16}}>{errors.email.message}</p>
                    </Grid>
                )}
                {errors.phone?.message && (
                    <Grid 
                    height="auto"
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        <p style={{color: "#ff0000", fontSize: 16}}>{errors.phone.message}</p>
                    </Grid>
                )}
                <Grid 
                item 
                xs={12}
                sm={12}
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                    
                        <TextField sx={{width: "100%"}} placeholder='title'
                        id="outlined-multiline-static" label="Title"
                        type="text" {...register("title", {
                            required: "Please provide title of your message",
                            pattern: {
                                value: /^[A-Z0-9][0-9A-Za-zżóźćęłą\s]+$/,
                                message: "Your title has to start with great letter and contains only letters and numbers."
                            },
                            minLength: {
                                value: 5,
                                message: "Your title has to be at least 5 sumbols"
                            }
                        })}/>
                    </Item>
                </Grid>
                {errors.title?.message && (
                    <Grid 
                    height="auto"
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        <p style={{color: "#ff0000"}}>{errors.title.message}</p>
                    </Grid>
                )}

                <Grid 
                item 
                xs={12}
                sm={12}
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                        <TextField sx={{width: "100%"}} id="outlined-multiline-static" label="Message" 
                        multiline rows={6} placeholder='write ur message...' 
                        {...register("content", {
                            required: "Please provide your message",
                            pattern: {
                                value: /^[A-ZŻÓŹĆĘĄÓŁ0-9\s./:;"'`><~,!?]+$/i,
                                message: "Your message has to starts with great letter and containt only letters, numbers and symbols."
                            },
                            minLength: {
                                value: 20,
                                message: "Your message has to be at least 20 sumbols."
                            }
                        })}/>
                    </Item>
                    
                </Grid>
                {errors.content?.message && (
                    <Grid 
                    height="auto"
                    xs={12}
                    sm={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={0}>
                        <p style={{color: "#ff0000"}}>{errors.content.message}</p>
                    </Grid>
                )}

                <Grid 
                item 
                xs={12}
                sm={12}
                display="flex"
                alignItems="center"
                p={2}>
                    <Item elevation={0}>
                    <LoadingButton 
                        variant="contained"
                        loading={isSubmitting}
                        endIcon={<SendIcon  />}
                        loadingPosition="end"
                        type="submit">
                            {isSubmitting ? "Loading..." : "Send"}
                    </LoadingButton>
                    </Item>
                </Grid>
            
            </Grid>

            {/* {errors.root && <p>{errors.root.message}</p>} */}

        </Paper>
        </form>
        </Container>
    )
}

export default ContactForm