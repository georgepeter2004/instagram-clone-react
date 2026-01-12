import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
  const API = import.meta.env.VITE_API_URL
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  let tot = 0;
  useEffect(() => {
    fetch(`${API}/story`)
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.log(err))
  }, []);
  return (
    
    <div className='story d-flex'>
      <div className="d-none">
        {tot=stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} onClick={()=>navigate('/story/'+story.id+'/'+ tot )}>
            <div className='gradient-border mx-2' >
              <img src={story.user.profile} alt="" className='story-dp rounded-circle' />
            </div>
            <p className='text-truncate' style={{width:"80px"}}>{story.user.username}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

    </div>
  )
}

export default Stories