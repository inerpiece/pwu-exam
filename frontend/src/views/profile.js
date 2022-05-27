// src/views/profile.js

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../client';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllByUserEmail } from '../api/carQuery';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email, nickname, updated_at } = user;

  let formatedDate = updated_at.split('T')[0]

  const [carData, setCarData] = useState(null);

  const allCarsByUserEmailQuery = getAllByUserEmail(email);

  const allByUser = () => {
    sanityClient
      .fetch(allCarsByUserEmailQuery)
      .then((data) => setCarData(data))
      .catch(console.error)
  }

  useEffect(() => {
    allByUser();
  }, []);

  return (
    <section className='pt-20'>
      <div className='flex justify-center py-10 sm:p-10 text-white'>
        <div className="border-2 border-black xl:w-3/6 md:w-4/6 sm:w-full bg-slate-600 flex-col p-10">
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
      </div>
      <div className='mx-auto border-2 w-5/6'>
        <div className='flex-row flex-wrap justify-evenly mb-8 px-5 sm:px-20'>
          { carData && carData.map((car, index) => (
          <article className='w-4/4 sm:w-4/4 lg:w-2/4 2xl:w-1/4 inline-block p-2'>
            <Link to={"/cars/" + car.slug.current} key={car.slug.current}>
              <article className='mx-auto w-100 p-4 rounded bg-slate-700 flex-col text-white hover:bg-slate-600'>
                <div className=''>
                  <img className='h-80 object-contain' src={car.image.asset.url} alt={ car.slug } />
                </div>
                <div>
                  <div className=''>
                    <h2 className='text-2xl font-bold min-h-20'>Model: {car.brand} {car.name}</h2>
                  </div>
                  <div className='mt-8 flex flex-wrap justify-between min-h-40'>
                    <h3 className='text-xl min-h-20'><span className='underline'>Description:</span> {car.description.toLowerCase().substring(0,80)}...</h3>
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