// src/views/profile.js

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../client';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email, nickname, updated_at } = user;

  let formatedDate = updated_at.split('T')[0]

  const [carData, setCarData] = useState(null);

  const allByUser = () => {
    sanityClient
      .fetch(`*[user == '${email}']{
        name,
        _id,
        user,
        slug,
        "brand": brand[]->name,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        description
      }`)
      .then((data) => setCarData(data))
      // .then(window.location.href = 'http://localhost:3000/profile') // NEEDS TO BE UPDATED FOR THE BUILD
      .catch(console.error)
  }

  useEffect(() => {
    allByUser();
  }, []);

  return (
    <section>
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
      <div className='mx-auto border-2 w-5/6'>
        <div className='flex-row flex-wrap justify-evenly mb-8 px-20'>
          { carData && carData.map((car, index) => (
          <article className='w-1/4 inline-block p-2'>
            <Link to={"/cars/" + car.slug.current} key={car.slug.current}>
              <article className='mx-auto w-100 p-4 rounded bg-slate-700 flex-col text-white hover:bg-slate-600'>
                <div className=''>
                  <img className='h-80 object-contain' src={car.image.asset.url} alt={ car.slug } />
                </div>
                <div>
                  <div className=''>
                    <h2 className='text-2xl font-bold'>Model: {car.brand} {car.name}</h2>
                  </div>
                  <div className='mt-8 flex flex-wrap justify-between'>
                    <h3 className='text-xl'><span className='underline'>Description:</span> {car.description.toLowerCase().substring(0,80)}...</h3>
                  </div>
                  <div className='mt-8 mb-4'>
                    <span className='border p-4 rounded hover:bg-white hover:text-black underlined'>Stop Renting &#10132;</span>
                  </div>
                </div>
              </article>
            </Link>
          </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;