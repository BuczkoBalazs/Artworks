import React from 'react'

function ArtworkDetails({_id, name, description}) {
  return (
    <div key={_id}>  
        <h2>{name}</h2>
        <p>This is the detailed page of an artwork.</p>
        <h3>{description}</h3>
    </div>
  )
}

export default ArtworkDetails