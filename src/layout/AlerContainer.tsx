
import React from "react";
import styled from "styled-components";
import AlertComponent from "../components/Alert";
import { useAppSelector } from "../hooks";

const AlertContainer = () => {
    const {alertList} = useAppSelector(state => state.alert);

    return (
        <Container>
            {alertList.map((alert)=> (
                <AlertComponent key={alert.id} text={alert.text} type={alert.type} id={alert.id}/>
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
    right: 5px;
    bottom: .5%;
    width: auto;
    height: auto;
`