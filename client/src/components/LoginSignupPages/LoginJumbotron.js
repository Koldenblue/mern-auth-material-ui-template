import React from 'react';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container } from '@material-ui/core';


export default function LoginJumbotron() {
  return (
    <div className='login-jumbotron' fluid>
      <Container>
        <h1 className='login-title'>Welcome</h1>
      </Container>
    </div>
  )
}