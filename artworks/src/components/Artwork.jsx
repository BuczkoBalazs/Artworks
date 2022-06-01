import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Artwork({ _id, name, creator, description, price, image, favsList }) {
    
  const [isFavorite, setIsFavorite] = useState((Array.from(favsList).indexOf(_id) === -1) ? false : true)
  const [popup, setPopup] = useState(false);

  return (
    <div className="ArtworkCard" key={_id}>
      <img src={require(`../images/${image}`)} alt="" />
      <h2>{name}</h2>
      <h5>
        Created by <i>{creator}</i>
      </h5>
      <h3>Price: {price} ETH</h3>
      <div className="artwork-functions">
        <div>
          <div>
            {popup && 
            <>
              <div className="popupoverlay">
                <div className="popupbox">
                  <div>
                    <img src={require(`../images/${image}`)} alt="" />
                  </div>
                  <div className="popupinfo">
                    <div>
                      <h2>{name}</h2>
                    </div>
                    <div>
                      <h5>Created by <i>{creator}</i></h5><br />
                    </div>
                    <div>
                      <h3>Price: {price} ETH</h3>
                    </div><br />
                    <div>
                      <p>{description}</p>
                    </div>
                  </div>
                  <button className="popup-close-btn" onClick={()=> {setPopup(!popup)}}>X</button>
                </div>
              </div>
            </>
            }
            <button onClick={()=> {setPopup(!popup)}}>Check out!</button>
          </div>
        </div>  
        <div>
          {isFavorite ? 
          <FavoriteIcon className="favButton" onClick={() => {
            fetch("http://127.0.0.1:3001/addToFav", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem("token")).token.substring(0, JSON.parse(sessionStorage.getItem("token")).token.length - 2),
                imageId: _id,
              }),
            }).then(async (data) => {
              if (data.status === 200) {
                console.log("done");
                setIsFavorite(!isFavorite);
              }
            });
          }} /> : 
          <FavoriteBorderIcon className="favButton" onClick={() => {
            fetch("http://127.0.0.1:3001/addToFav", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem("token")).token.substring(0, JSON.parse(sessionStorage.getItem("token")).token.length - 2),
                imageId: _id,
              }),
            }).then(async (data) => {
              if (data.status === 200) {
                console.log("done");
                setIsFavorite(!isFavorite);
              }
            });
          }} /> }
        </div>
      </div>
    </div>
  );
}

export default Artwork;