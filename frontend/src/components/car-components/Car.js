import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../../client';
import Banner from '../Banner';

export default function Car() {
  const [carData, setCarData] = useState(null);
  const [carCount, setCarCount] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  // const [bmwCount, setBmwCount] = useState(null);
  const [filters, setFilters] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  // let currentPage = 0;
  let carsPerPage = 8;
  let currentStart = pageNum * carsPerPage;
  let currentEnd = currentStart + carsPerPage - 1;

  const nextPage = () => {
    
    // if (pageNum > Math.ceil(carData.length / carsPerPage)) setPageNum(0)
    if (pageNum >= numOfPages() - 1) {
      setPageNum(numOfPages() - 1)
    } else {
      setPageNum(pageNum + 1);
    };
    // currentPage++
    // if (currentPage > numOfPages()) currentPage = numOfPages();
  }

  const prevPage = () => {
    if (pageNum <= 0) {
      setPageNum(0)
    } else {
      setPageNum(pageNum - 1);
    };
    // currentPage--
    // if (currentPage < 0) currentPage = 0;
  }

  // const numOfPages = () => {
  //   if (carCount == null) {
  //     setTotalPages(Math.ceil(bmwCount.length / carsPerPage))
  //     return Math.ceil(bmwCount.length / carsPerPage);
  //   } else if (bmwCount == null) {
  //     setTotalPages(Math.ceil(carCount.length / carsPerPage));
  //     return Math.ceil(carCount.length / carsPerPage);
  //   } else {
  //     return;
  //   }
  // }

  const numOfPages = () => {
    setTotalPages(Math.ceil(carCount.length / carsPerPage));
    return Math.ceil(carCount.length / carsPerPage);
  }

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "brand"]{name}`)
      .then((data) => setFilters(data))
      .catch(console.error)
  }, [])

  const filterAll = () => {
    // CallCarCountFunction()
    if (currentFilter == "all") {
      sanityClient
      .fetch(`*[_type == "car"][${currentStart}..${currentEnd}]{
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
    } else {
      sanityClient
        .fetch(`*["${currentFilter}" in brand[]->name][${currentStart}..${currentEnd}]{
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
    }
  }

  const setFilterToAll = () => {
    setCurrentFilter("all");
  }

  const filterCar = (e) => {
    setCurrentFilter(e.target.dataset.filter);
    sanityClient
      .fetch(`*["${e.target.dataset.filter}" in brand[]->name][${currentStart}..${currentEnd}]{
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
      .catch(console.error);

    setCarCount(carData)
    numOfPages()
  }

  //The below pulls all cars so that I can calculate the number of pages based on the carsPerPage
  const CallCarCountFunction = () => {
    //resetting all other filter values so that only the carCount is valid
    // setBmwCount(null)
    
    //setting the carCount
    sanityClient
      .fetch(`*[_type == "car"]`)
      .then((data) => setCarCount(data))
      .catch(console.error)
  }
  CallCarCountFunction()

  //The below pulls only the cars with brand of BMW so that I can calculate the pages based on that filter
  // const CallBmwCountFunction = () => {
  //   //resetting all other filter values so that only the bmwCount is valid
  //   setCarCount(null);

  //   //setting the bmwCount
  //   sanityClient
  //     .fetch(`*["BMW" in brand[]->name]`)
  //     .then((data) => setBmwCount(data))
  //     .catch(console.error)
  // }

  //The below pulls only the cars for the current page, GROQ allows for start and end criteria when pulling data
  useEffect(() => {
    filterAll()
  }, [pageNum, currentFilter]);

  return (
    <main>
      <section>
        <Banner orientation="right" title="FAST AND EASY WAY TO RENT A CAR" description="Looking for unbelievable prices on a car rental? Rent an exclusive set of cars and you are guaranteed to extract the most pristine experience out there! We work with top brands in the car industry to ensure your satisfaction." imgSrc="https://assets.webiconspng.com/uploads/2017/09/Ferrari-PNG-Image-68700.png"/>
        <section className='w-5/6 mx-auto bg-slate-700 text-white p-10'>
          <button className='bg-white px-5 py-2 text-black rounded-full hover:bg-slate-200 mr-5' onClick={setFilterToAll}>All</button>
          {filters && filters.map((filter) => <button data-filter={filter.name} className='bg-white px-5 py-2 text-black rounded-full hover:bg-slate-200 mr-5' onClick={filterCar}>{filter.name}</button>)}
        </section>
        <div className='flex-row flex-wrap justify-evenly mb-8 px-20'>
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
                    <h3 className='text-xl'><span className='underline'>Description:</span> {car.description.toLowerCase().substring(0,80)}...</h3>
                  </div>
                  <div className='mt-8 mb-4'>
                    <h2 className={car.availability ? 'bg-white p-4 text-black rounded-full inline mr-8 text-lg italic' : 'bg-white p-4 text-black rounded-full inline mr-8 text-lg italic opacity-40'}>{car.availability ? <span>Available</span> : <span>Not Available</span>} </h2>
                  </div>
                </div>
              </article>
            </Link>
          </article>
          ))}
        </div>
        <div className='flex justify-around'>
          <button className={pageNum == 0 ? 'border-2 border-gray rounded p-4 bg-gray-600 text-white opacity-50 cursor-default' : 'border-2 border-gray rounded p-4 bg-gray-600 text-white hover:border-green-500'}  onClick={prevPage}>Prev Page</button>
          <button className={totalPages - 1 == pageNum ? 'border-2 border-gray rounded p-4 bg-gray-600 text-white opacity-50 cursor-default' : 'border-2 border-gray rounded p-4 bg-gray-600 text-white hover:border-green-500'} onClick={nextPage}>Next Page</button>
        </div>
      </section>
    </main>
  )
}