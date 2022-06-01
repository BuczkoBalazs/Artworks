import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Registration from './Registration';

function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showReg, setShowReg] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loginEvent = async e => {
    e.preventDefault();

    fetch("http://127.0.0.1:3001/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(async data => {
        if (data.status === 200) {
          const token = await data.json();
          setToken(token);
        } else {
          const errMsg = await data.json();
          setErrorMsg(errMsg.error);
          setError(true);
        }
      })

  }

  return (
    <>
      <img src={require('../images/background/2375-min.jpg')} alt="1" className='start-image' />
      {!showReg && <div className="loginPage">
        <h2>Enter your data and log in</h2>
        <form className="loginForm">
          <TextField id="loginEmail" label="E-mail" variant="outlined" type="email" onChange={e => setEmail(e.target.value)}/>
          <TextField id="loginPassword" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)}/>
          <Button variant="outlined" onClick={loginEvent}>Log in</Button>
          {error && <p>{errorMsg}</p>}
          <Button variant="outlined" onClick={() => setShowReg(true)}>Registration</Button>
        </form>
      </div>}
      {showReg && <>
        <Registration />
        <Button className="loginButton" variant="outlined" onClick={() => setShowReg(false)}>Log in</Button>
      </>}    
    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login