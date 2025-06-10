import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addExtension } from "../../store/extensionsReducer";

const GetExtensionsFromDb = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state=>state.userData);
    const {extensionList} = useAppSelector(state=>state.extension);

    const getExtensionListFromDB = async () => {
        const databaseURL = 'https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app';
        const path = `/userId/${userData.id}/exceptionList.json`; 
        try {
            const response = await fetch(databaseURL + path, {
                method: "GET",
                headers: {'Content-type': "application/json"}
            })
            const json = await response.json();
            // console.log(json)
            if (Array.isArray(json) && json.length > 0 && extensionList.length === 0) {
                dispatch(addExtension(json));
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        if(userData.logged){
            getExtensionListFromDB()
        }
    },[userData])

    return (
        <>

        </>
    )
}

export default GetExtensionsFromDb