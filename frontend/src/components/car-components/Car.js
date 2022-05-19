import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../../client';

export default function Car() {
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "car"]{
        name,
        slug,
        "brand": brand[]->name,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        description,
        availability
      }`)
      .then((data) => setCarData(data))
      .catch(console.error)
  }, []);

  return (
    <main>
      <section>
        <h1>Rent a car</h1>
        <h2>Choose a car to rent from the below list.</h2>
        <div className='flex-row flex-wrap justify-evenly mb-8'>
          { carData && carData.map((car, index) => (
          <article className='w-1/4 inline-block p-2'>
            <Link to={"/car/" + car.slug.current} key={car.slug.current}>
              <article className='mx-auto w-100 p-4 rounded bg-slate-700 flex-col text-white hover:bg-slate-600'>
                <div className=''>
                  <img className='h-80 object-contain' src={car.image.asset.url} alt={ car.slug } />
                </div>
                <div>
                  <div className=''>
                    <h2 className='text-2xl font-bold'>Model: {car.brand} {car.name}</h2>
                  </div>
                  <div className='mt-8 flex flex-wrap justify-between'>
                    <h3 className='text-xl'><span className='underline'>Description:</span> {car.description.substring(0,100)}...</h3>
                  </div>
                  <div className='mt-8 mb-4'>
                    <h2 className='bg-white p-4 text-black rounded-full inline mr-8 text-lg italic'>Available: {car.availability ? <span>yes</span> : <span>no</span>} </h2>
                  </div>
                </div>
              </article>
            </Link>
          </article>
          ))}
        </div>
      </section>
    </main>
  )
}