import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

function Header({token}) {

  let user = JSON.parse(sessionStorage.getItem('token')).token.substring(0, JSON.parse(sessionStorage.getItem('token')).token.length - 2)

  return (
    <header className='header'>
        <p className='logo'>Rich People's Hobby Gallery</p>
        <p>Welcome on our site {user}!</p>
        <div className='nav-container'>
          <Link to='/' ><HomeOutlinedIcon /><span>Home</span></Link>
          <Link to='/gallery' ><CollectionsOutlinedIcon /><span>Gallery</span></Link>
          <Link to='/favourites' ><StarOutlineOutlinedIcon /><span>Favourites</span></Link>
          <Button variant="outlined" onClick={ () => {
            sessionStorage.removeItem('token')
            window.location.reload()
          }}>Log out</Button>
        </div>
    </header>
  )
}

export default Header