
import React from "react";
import styled from "styled-components";
import AlertComponent from "../components/Alert";
import { useAppSelector } from "../hooks";

const AlertContainer = () => {
    const {alertList} = useAppSelector(state => state.alert);

    console.log(alertList)
    return (
        <Container>
            {alertList.map((alert)=> (
                <AlertComponent text={alert.text} type={alert.type}/>
            ))}
        </Container>
    )
}

export default AlertContainer

const Container = styled.section`
    position: fixed;
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`