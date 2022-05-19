import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import sanityClient from "../../client";
import Loading from '../loading';

export default function SingleCar() {
  const [singleCarData, setSingleCarData] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(`*[slug.current == "${slug}"]{
        name,
        "brand": brand[]->name,
        fuelType,
        fuelConsumption,
        transmition,
        price,
        seats,
        "category": category[]->category,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        availability,
        description
      }`)
      .then((data) => setSingleCarData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singleCarData) return <Loading />;

  return (
    <main className='text-white'>
      <article className='w-5/6 mx-auto w-100 p-4 rounded bg-slate-500 flex justify-evenly'>
          <div className='w-4/6'>
            <img className='' src={singleCarData.image.asset.url} alt={ singleCarData.slug } />
          </div>
          <div className='w-2/6'>
            <div className=''>
              <h2 className='text-2xl font-bold'>Model: {singleCarData.brand} {singleCarData.name}</h2>
            </div>
            <div className='mt-8'>
              <h3 className='text-xl'>Fuel Type: {singleCarData.fuelType}</h3>
              <h3 className='text-xl'>Fuel Consumption/100km: {singleCarData.fuelConsumption}L</h3>
              <h3 className='text-xl'>Transmition Type: {singleCarData.transmition}</h3>
              <h3 className='text-xl'>Passenger Seats: {singleCarData.seats}</h3>
            </div>
            <div className='mt-8 mb-8'>
              <h2 className='bg-white p-4 text-black rounded-full inline mr-8 text-lg italic'>${singleCarData.price} <span>/per day</span></h2>
              <button className='border p-4 rounded hover:bg-white hover:text-black'>Rent now</button>
            </div>
            <div>
              <h4>{singleCarData.description}</h4>
            </div>
          </div>
      </article>
    </main>
  )
}