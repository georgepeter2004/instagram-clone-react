import React, { useEffect, useState } from 'react'
import { useParams ,Link, useNavigate } from 'react-router-dom'
function viewStory() {
  
  const API = "http://localhost:5000/api"
  const { id , tot } = useParams();
  const [story, setStory] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/story/${id}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err))
  },[id])

  if(id>tot || id<=0){
    navigate('/')
  }

  return (
    <>
      {story ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Link className='' to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
          <img className='vh-100 ' src={story.image} alt="" />
          <Link className='' to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
        </div>
      ) : (<p>loading...</p>)
      }
    </>
  )
}

export default viewStory