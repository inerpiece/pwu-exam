import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import sanityClient from "../../client";
import Loading from '../loading';
import {useAuth0} from '@auth0/auth0-react';

export default function SingleCar() {
  const [singleCarData, setSingleCarData] = useState(null);

  const { slug } = useParams();

  const { user } = useAuth0();
  const { email } = user;

  const rentCar = () => {
    console.log(singleCarData._id)
    sanityClient
      .patch(singleCarData._id)
      .set({user: email})
      .set({availability: false})
      .commit()
      .then((updatedCar) => {
        console.log(updatedCar)
      })
      .then(() => window.location.reload())
      .catch((err) => {
        console.error('Unsuccessful: ', err.message)
      })
  }

  const stopRenting = () => {
    sanityClient
      .patch(singleCarData._id)
      .set({availability: true})
      .set({user: ''})
      .commit()
      .then(() => window.location.reload())
      .catch((err) => {
        console.error('Something went wrong...', err.message)
      })
  }

  useEffect(() => {
    sanityClient
      .fetch(`*[slug.current == "${slug}"]{
        _id,
        user,
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
    <main className='text-white pt-16 px-5 xl:pt-32'>
      <article className='w-full xl:w-5/6 mx-auto w-100 px-5 xl:px-20 py-5 xl:py-40 rounded bg-slate-700 block xl:flex justify-evenly'>
        <div className='xl:w-4/6'>
          <img className='rounded-lg' src={singleCarData.image.asset.url} alt={ singleCarData.slug } />
        </div>
        <div className='xl:w-2/6 xl:pl-10'>
          <div className='pt-5'>
            <h2 className='text-2xl font-bold'>Model: {singleCarData.brand} {singleCarData.name}</h2>
          </div>
          <div className='mt-8'>
            <h3 className='text-xl'>Fuel Type: {singleCarData.fuelType}</h3>
            <h3 className='text-xl'>Fuel Consumption/100km: {singleCarData.fuelConsumption}L</h3>
            <h3 className='text-xl'>Transmition Type: {singleCarData.transmition}</h3>
            <h3 className='text-xl'>Passenger Seats: {singleCarData.seats}</h3>
            <h3 className='text-xl'>Available: {singleCarData.availability ? "Yes" : "No"}</h3>
            <h3 className='text-xl'>Rented by: {singleCarData.user}</h3>
          </div>
          <div className='mt-8 mb-8'>
            <h2 className='bg-white p-4 text-black rounded-full inline mr-4 text-lg italic'>${singleCarData.price} <span>/per day</span></h2>
            {singleCarData.user == email ? <button className='border p-4 rounded hover:bg-white hover:text-black' onClick={stopRenting}>Stop Renting</button> : <button className={singleCarData.availability ? 'border p-4 rounded hover:bg-white hover:text-black' : 'border p-4 rounded opacity-40 cursor-default'} disabled={singleCarData.availability ? false : true} onClick={rentCar}>Rent now</button>}
            
          </div>
          <div>
            <h4>{singleCarData.description}</h4>
          </div>
        </div>
      </article>
    </main>
  )
}