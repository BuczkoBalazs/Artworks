import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Artwork from './Artwork';

function Preferences() {
  const [artworks, setArtworks] = useState([]);
  const [favsList, setFavsList] = useState([]);
  
  let user = JSON.parse(sessionStorage.getItem('token')).token.substring(0, JSON.parse(sessionStorage.getItem('token')).token.length - 2)

  async function getFavsList() {
    fetch("http://127.0.0.1:3001/getFavs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(sessionStorage.getItem("token")).token.substring(0, JSON.parse(sessionStorage.getItem("token")).token.length - 2),
      }),
    }).then(async (data) => {
      if (data.status === 200) {
        const dataJson = await data.json();
        setFavsList(dataJson);
      }
    });
  }

  async function fetchArtworks() {

    const response = await fetch("http://localhost:3001/read")
    const responseJSON = await response.json()
    setArtworks(responseJSON)

  }

  useEffect(_ => {
    fetchArtworks();
  }, []);
  
  useEffect(_ => {
    getFavsList();
  }, [])

  const favImages = artworks.filter(artwork => favsList.includes(artwork._id));

  return (
    <Layout>
      <div className='favourites-wrapper'>
        <h2>Here are your favourite artworks, {user}!</h2>
        <div className='favourites-grid'>
          {favImages.map(({ _id, name, creator, description, price, image }) =>
          <Artwork key={_id} _id={_id} name={name} creator={creator} description={description} price={price} image={image} favsList={favsList} />)}
        </div>
      </div>
    </Layout>
  )
}

export default Preferences