import React, { Fragment, useEffect, useState } from "react";
import Testimonial from '../components/Testimonial';
import sanityClient from '../client';

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "testimonial"]{
        name,
        body,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        rating
      }`)
      .then((data) => setTestimonials(data))
      .catch(console.error)
  }, [])

  return (
    <Fragment>
      <article className="w-5/6 mx-auto mt-40 bg-slate-600 pb-40 pt-20 rounded">
        <h2 className="flex justify-center text-6xl p-10 text-white">Read what our customers have to say</h2>
        <h3 className="flex justify-center text-3xl p-10 text-white">Testimonials</h3>
        <div className="block lg:flex justify-around">
          {testimonials && testimonials.map((testimonial) => 
            <Testimonial author={testimonial.name} srcImg={testimonial.image.asset.url} body={testimonial.body} stars={testimonial.rating}/>)}
        </div>
      </article>
    </Fragment>
  )
};

export default TestimonialSection;