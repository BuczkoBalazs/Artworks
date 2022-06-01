import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Artwork from './Artwork'

function Dashboard() {

  const [artworks, setArtworks] = useState([])
  const [input, setInput] = useState("")
  const [sortprice, setSortPrice] = useState("desc")
  const [pricebutton, setPriceButton] = useState("High to Low")
  const [sortname, setSortName] = useState("abc")
  const [namebutton, setNameButton] = useState("ABC sort")
  const [favsList, setFavsList] = useState([]);

  async function fetchArtworks() {

    const response = await fetch("http://localhost:3001/read")
    const responseJSON = await response.json()
    setArtworks(responseJSON)

  }


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

  useEffect(() => {
    fetchArtworks()
  }, [])

  useEffect(_ => {
    getFavsList()
  }, [])

  function sortPrice() {
    setArtworks([...artworks.sort((a, b) => sortprice === "desc" ? b.price - a.price : a.price - b.price)])
    setSortPrice(sortprice === "desc" ? "asc" : "desc")
    setPriceButton(pricebutton === "High to Low" ? "Low to High" : "High to Low")
  }

  function sortName() {
    setArtworks([...artworks.sort((a, b) => sortname === "abc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))])
    setSortName(sortname === "abc" ? "cba" : "abc")
    setNameButton(namebutton === "ABC sort" ? "CBA sort" : "ABC sort")
  }

  const handleChange = (e) => {

    const { value, checked } = e.target;
    console.log(`${value} is ${checked}`);
     
    if (checked ) {
      setArtworks(artworks.filter(card => card.creator === value))
    } else{
      fetchArtworks()
    }
  

  };

  return (
    <Layout>
      <div className='artwork-wrapper'>
        <div className='artwork-filters'>
          <h1>Sick Rat's NFT collection</h1>
          <p>Currently one of the most popular NFT collections is Sick Rat's NFT Collection (SRNC), a collection of 10,000 astronauts on the Ethereum blockchain. It currently has a floor price of over 10000 ETH.</p>
          <h3>Filter by Title</h3>
          <input type="text" name="title" placeholder="Search by title..." value={input} onChange={({target}) => {setInput(target.value)}}/>
          <h3>Filter by Creator</h3>
            <div>
              <input onChange={handleChange} type="checkbox" id="joemama" name="joemama" value="Joe Mama"  />
              <label for="joemama">Joe Mama</label>
            </div>
            <div>
              <input onClick={handleChange} type="checkbox" id="bendover" name="bendover" value="Ben Dover"/>
              <label for="bendover">Ben Dover</label>
            </div>
            <div>
              <input onClick={handleChange} type="checkbox" id="mikeoxlong" name="mikeoxlong" value="Mike Oxlong"/>
              <label for="mikeoxlong">Mike Oxlong</label>
            </div>
            <div>
              <button onClick={sortName}>{namebutton}</button> 
            </div>
            <div>
              <button onClick={sortPrice}>{pricebutton}</button>
            </div>
        </div>
        <div className='artwork-grid'>
          {artworks.map(({_id, name, creator, description, price, image}) => 
          (name.toLowerCase().includes(input.toLowerCase()) && 
          <Artwork key={_id} _id={_id} name={name} creator={creator} description={description} price={price} image={image} favsList={favsList} />))}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard