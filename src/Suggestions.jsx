import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestions() {
  const API = import.meta.env.VITE_API_URL
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${API}/profilek`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err))

    fetch(`${API}/suggestion`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSuggestions(data)
      })
      .catch(err => console.log(err))

  }, []);

  const handlefollow = async (id, username) => {
    axios.post(`${API}/followers`, { "id": id, "username": username })
      .then(() => alert('following'))
      .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center ' >
      <div className="suggestions w-75 m-4">
        {profile ? (
          <div className='d-flex' >
            <img className="dp rounded-circle" src={profile.profile} alt="" />
            <h5>{profile.username}</h5>
            <small className='ms-auto text-primary'>switch</small>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className='d-flex m-1'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

        {suggestions ? (
          <div >
            {suggestions.map((Suggestion) => (
              <div className='my-2' key={Suggestion.id}>
                <div className='d-flex' >
                  <img className="dp rounded-circle" src={Suggestion.profile} alt="" />
                  <h5>{Suggestion.username}</h5>
                  <p className='ms-auto btn btn-primary' onClick={() => { handlefollow(Suggestion.id, Suggestion.username) }}>Follow</p>
                </div>
              </div>))
            }

          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
}
export default Suggestions