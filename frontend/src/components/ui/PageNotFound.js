import React from 'react';
import {Link} from 'react-router-dom';

export default function PageNotFound() {
  return (
    <section className='w-5/6 mx-auto h-screen p-20'>
      <h1 className='text-8xl mb-10'>404: Page NOT found try visiting:</h1>
      <Link className='text-8xl m-0 p-0' to="/"><span className='text-green-500 m-0 p-0 hover:text-green-600'>Home</span></Link>
    </section>
  )
}