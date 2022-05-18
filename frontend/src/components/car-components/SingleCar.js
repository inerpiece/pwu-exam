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
        }
      }`)
      .then((data) => setSingleCarData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singleCarData) return <Loading />;

  return (
    <main>
      <article>
        <header>
          <div>
            <div>
              <h1>{singleCarData.name}</h1>
              <div>
                <img src={singleCarData.image.asset.url} alt={singleCarData.name} />
              </div>
              <p>{singleCarData.category}</p>
            </div>
          </div>
          <img />
        </header>
        <div>blc</div>
      </article>
    </main>
  )
}