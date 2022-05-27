import React from 'react';

export default function Banner(props) {
  return (
    <div className='relative pt-20'>
      {props.orientation == 'right' ? 
        <div className='flex md:block xl:flex'>
          <div className='w-6/6 md:w-4/6 p-10 md:pt-40 md:pl-20 text-2xl z-10 xl:w-2/6 md:mx-auto'>
            <h2 className='text-6xl' data-testid="BannerH2">{props.title}</h2>
            <p className='pt-20'>{props.description}</p>
          </div>
          <div className='w-full absolute top-0 left-0 right-0 left-0 z-0 opacity-50 md:w-4/6 md:block md:opacity-100 md:relative md:mx-auto xl:w-4/6'>
            <img className='w-full' src={props.imgSrc}/>
          </div>
        </div> : null
      }
      {props.orientation == 'left' ? 
        <div className='flex md:block xl:flex'>
          <div className='w-full absolute top-0 left-0 right-0 left-0 z-0 opacity-50 md:w-4/6 md:block md:opacity-100 md:relative md:mx-auto xl:w-4/6'>
            <img className='w-full' src={props.imgSrc}/>
          </div>
          <div className='w-6/6 md:w-4/6 p-10 md:pt-40 md:pr-20 text-2xl z-10 xl:w-2/6 md:mx-auto'>
            <h2 className='text-6xl'>{props.title}</h2>
            <p className='pt-20'>{props.description}</p>
          </div>
        </div>: null
      }
    </div>
  )
}