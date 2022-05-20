import React from 'react';

export default function Banner(props) {
  return (
    <div data-testid="Banner" title="Hello World">
      {props.orientation == 'right' ? 
        <div className='flex'>
          <div className='w-2/6 pt-40 pl-20 text-2xl'>
            <h2 className='text-6xl'>{props.title}</h2>
            <p className='pt-20'>{props.description}</p>
          </div>
          <div className='w-4/6'>
            <img className='w-full' src={props.imgSrc}/>
          </div>
        </div> : null
      }
      {props.orientation == 'left' ? 
        <div className='flex'>
          <div className='w-4/6'>
            <img className='w-full' src={props.imgSrc}/>
          </div>
          <div className='w-2/6 pt-40 px-20 text-2xl'>
            <h2 className='text-6xl'>{props.title}</h2>
            <p className='pt-20'>{props.description}</p>
          </div>
        </div>: null
      }
    </div>
  )
}