import React from 'react'
import styled from 'styled-components'
import Container from '@mui/material/Container';

const BoxSizes = () => {

    return (
        <Container >
            <Box>
                {/* <div className='square st'>
                    <div className='lane st'></div>
                    <div className='lane sec'></div>
                    <div className='lane rd'></div>
                    <div className='lane th'></div>
                </div>
                <div className='square sec'>

                </div> */}
                
                {/* <div className='lane fifth'></div>
                <div className='lane sixth'></div>
                <div className='lane seventh'></div>
                <div className='lane eighth'></div>
                <div className='lane ninth'></div>
                <div className='lane tenth'></div> */}

            </Box>
        </Container >
    )
}

const Box = styled.div`
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .square {
        position: relative;
        border: 2px solid #696767;
        width: 200px;
        height: 150px;
        &.st {
            margin-right: -25px;
            margin-bottom: -70px;
        }
        &.sec {
            margin-left: -25px;
            margin-top: -70px;
        }
    }
    .lane {
        position: absolute;
        height: 2px;
        background-color: #696767;
        &.st {
            width: 85%;
            bottom: 124%;
            left: -4%;
            transform: rotate(335deg);
        }
        &.sec {
            width: 85%;
            bottom: 124%;
            right: -81%;
            transform: rotate(335deg);
        }
        &.rd {
            width: 85%;
            bottom: 23%;
            left: -4%;
            transform: rotate(335deg);
        }
        &.th {
            width: 85%;
            bottom: 23%;
            right: -81%;
            transform: rotate(335deg);
        }
    }
`

export default BoxSizes