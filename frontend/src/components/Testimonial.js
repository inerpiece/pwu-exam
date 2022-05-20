import React from 'react';

export default function Testimonial (props) {
  return (
    <div className='w-1/4 border-2 p-4 rounded bg-slate-100'>
      <div className='flex justify-around'>
        <h2 className='flex items-center text-xl'>{props.author}</h2>
        <img className='w-20 rounded-full' src={props.srcImg}/>
      </div>
      <p className='text-xl'>{props.body}</p>
      <p className='flex justify-end'>{[...Array(props.stars)].map((e, i) => <span className="text-2xl" key={i}>&#9733;</span>)}</p>
    </div>
  )
}