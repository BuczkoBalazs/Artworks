import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Footer() {

  const [clicked, setClicked] = useState(false)

  return (
    <>
      {clicked ? <></> :
        <footer className='footer'>
            <p>We are only trade with artworks not your data. Don't worry just spend here money!</p>
            <Button variant="outlined" onClick={() => {
              window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
              setClicked(true)
            }}>X</Button>
        </footer>
      } 
    </>
  )
}

export default Footer