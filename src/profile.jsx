import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

function Profile() {
    const API = import.meta.env.VITE_API_URL
    const [profile, setProfile] = useState();
    const [followers, setFollowers] = useState([]);
    const [unfollowed, setUnfollowed] = useState(0);

    useEffect(() => {
        axios.get(`${API}/profilek`)
            .then(data => setProfile(data.data))
            .catch(err => console.log(err))

        axios.get(`${API}/followers`)
            .then(data => setFollowers(data.data))
            .catch(err => console.log(err))
    }, [unfollowed])

    function handleOnchange(e) {
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = async () => (
        axios.put(`${API}/profilek`, profile)
            .then(console.log("updated"))
            .catch(err => console.log(err))
    )

    const handleUnfollow = async (id) => (
        axios.delete(`${API}/followers/`+id)
            .then(alert('unfollowed'))
            .then(setUnfollowed(!unfollowed))
            .catch(err => console.log(err)))
    

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img className="profile rounded-circle" src={profile.profile} alt="" />
                    <h5>{profile.username}</h5>

                    <input type="text" value={profile.username} name='username' className='form-control my-4' onChange={handleOnchange} />
                    <input type="text" value={profile.profile} name="profile" className='form-control' onChange={handleOnchange} />
                    <button className='btn btn-primary my-4' onClick={handleUpdate}>Update</button>
                </div>
            ) : (
                <div>
                    loading Profile...
                </div>
            )}

            {followers ? (
                followers.map(follower => (
                    <div key={follower.id} className='d-flex m-2'>{follower.username}
                        <button className='btn btn-secondary ms-auto' onClick={() => handleUnfollow(follower.id)}>Unfollow</button></div>
                ))
            ) : (
                <div>loading followers</div>
            )}
        </div>
    )
}

export default Profile;