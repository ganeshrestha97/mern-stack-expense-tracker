import { useState, useEffect } from 'react';
import * as profileService from '../../utilities/profiles-service';

export default function ProfilePage({ user }) {
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
      async function getProfile() {
        const profileData = await profileService.getProfile(user._id);
        setProfile(profileData);
      }
      getProfile();
    }, [user._id]);
  
    return (
      <div>
        <h1>Profile Page</h1>
        {profile ? (
          <>
            <img src={profile.profilePic} alt="Profile" />
            <p>{profile.bio}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }