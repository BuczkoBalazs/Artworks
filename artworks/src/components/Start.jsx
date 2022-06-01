import { requirePropFactory } from '@mui/material';
import React from 'react';
import Layout from './Layout'

function Start() {
  return (
    <Layout>
        <img src={require('../images/background/2375-min.jpg')} alt="1" className='start-image' />
        <h1 className='welcome-message'>Welcome to our millionaire art connoisseur friend's the gallery </h1>
    </Layout>
  )
}

export default Start