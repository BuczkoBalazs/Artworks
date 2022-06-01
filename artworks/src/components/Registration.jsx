import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';

const errorMessageElement = message => <p className="errorMessage">{message}</p>;

const loadingElement = _ => <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;

function Registration() {
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  return (
    <>
      {showContent && <div className="regPage">
        <h2>Fill the fields</h2>
        <form className="regForm">
          <TextField id="regEmail" label="E-mail" variant="outlined" type="email" onChange={e => setRegEmail(e.target.value)} />
          <TextField id="regPassword" label="Password" variant="outlined" type="password" onChange={e => setRegPassword(e.target.value)} />
          <TextField id="regPassword2" label="Password again" variant="outlined" type="password" onChange={e => setRegPassword2(e.target.value)} />
          <Button variant="outlined" onClick={e => {
            if (!(regEmail.includes('@') && regEmail.includes('.'))) {
              setErrorMessage("E-mail address must contain @ and . characters!");
              setShowError(true);
            } else if (regPassword !== regPassword2) {
              setErrorMessage("Entered passwords must match!");
              setShowError(true);
            } else {
              setShowError(false);
              setShowContent(false);
              setShowLoading(true);

              fetch("http://127.0.0.1:3001/reg", {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({
                  "email": regEmail,
                  "password": regPassword
                })
              })
                .then(async data => {
                  if (data.status === 200) {
                    setShowFail(false);
                    setTimeout(_ => {
                      setShowLoading(false);
                      setShowContent(true)
                      setShowDone(true);
                    }, 3000);
                  } else if (data.status === 500) {
                    const errMsg = await data.json();
                    setFailMessage(errMsg.error);
                    setShowLoading(false);
                    setShowContent(true);
                    setShowFail(true);
                  } 
                  else {
                    setShowLoading(false);
                    setShowContent(true)
                    setShowFail(true);
                  }
                })
            }

          }}>Registration</Button>
          {showError && errorMessageElement(errorMessage)}
        </form>
      </div>}
      {showLoading && loadingElement()}
      {showDone && <p>Registered successfully!</p>}
      {showFail && <p>{failMessage}</p>}
    </>
  )
}

export default Registration