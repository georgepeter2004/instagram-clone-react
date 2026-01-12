import React, { useEffect, useState } from 'react'

function Posts() {
  const API = import.meta.env.VITE_API_URL
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch(`${API}/posts`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(err => console.log(err.message))
  }, [API]);

  return (
    <div>
      {
        posts.length > 0 ? (
          <div className="d-flex flex-column align-items-center">
            {
              posts.map((post) => {
                return (
                  <div className="my-3 post" key={post.id} >
                    <div className='d-flex'>
                      <img className='dp rounded-circle' src={post.user.profile} alt="" />
                      <h5>{post.user.username}</h5>
                    </div>
                    <img className='image' src={post.image} alt="" />

                    <div>
                      <i className="bi bi-heart"></i>
                      <i className="bi bi-chat"></i>
                      <i className="bi bi-send"></i>
                    </div>

                    <div>
                      <b>{post.likes} likes</b>
                      <p>{post.caption}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        ) : (
          <div>
            loading posts...
          </div>
        )}
    </div>
  )
}

export default Posts