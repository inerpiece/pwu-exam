// src/views/profile.js

import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email, nickname, updated_at } = user;

  let formatedDate = updated_at.split('T')[0]

  return (
    <div className='flex justify-center p-10 text-white'>
      <div className="border-2 border-black w-3/6 bg-slate-600 flex-col p-10">
        <div className="w-full flex justify-center">
          <img
            src={picture}
            alt="Profile"
            className=""
          />
        </div>
        <div className='py-10'>
          <h2 className="text-2xl py-4">Name: {name}</h2>
          <p className="text-xl">Nickname: {nickname}</p>
          <p className="text-xl">Email: {email}</p>
          <p className="text-xl">Last updated: {formatedDate}</p>
        </div>
      </div>
      {/* <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div> */}
    </div>
  );
};

export default Profile;