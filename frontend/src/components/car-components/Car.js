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
        image{
          asset->{
            _id,
            url
          },
          alt
        }
      }`)
      .then((data) => setCarData(data))
      .catch(console.error)
  }, []);

  return (
    <main>
      <section>
        <h1>Rent a car</h1>
        <h2>Choose a car to rent from the below list.</h2>
        <div>
          { carData && carData.map((car, index) => (
          <article>
            <Link to={"/car/" + car.slug.current} key={car.slug.current}>
              <span key={index}>
                <img src={car.image.asset.url} alt={car.image.alt} />
                <span>
                  <h3>{car.name}</h3>
                </span>
              </span>
            </Link>
          </article>
          ))}
        </div>
      </section>
    </main>
  )
}