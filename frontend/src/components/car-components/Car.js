import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../../client';
import Banner from '../Banner';
import { Outlet } from 'react-router-dom';

export default function Car() {
  const [carData, setCarData] = useState(null);
  const [carCount, setCarCount] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [filters, setFilters] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  let carsPerPage = 8;
  let currentStart = pageNum * carsPerPage;
  let currentEnd = currentStart + carsPerPage - 1;

  // changes the pageNum state to state + 1
  const nextPage = () => {
    if (pageNum >= numOfPages() - 1) {
      setPageNum(numOfPages() - 1)
    } else {
      setPageNum(pageNum + 1);
    };
  }

  // changes the pageNum state to state - 1
  const prevPage = () => {
    if (pageNum <= 0) {
      setPageNum(0)
    } else {
      setPageNum(pageNum - 1);
    };
  }

  //a function used to set the carCount state based on data provided, it is used whenever filterAll is called inside of the CallCarCountFunction()
  const changeCarCount = (data) => {
    setCarCount(prevCount => prevCount = data)
  }

  //calculates the number of pages. NOTE: it will return 1 at the minimum which is considered 2 pages, the Next Page button has a check for the count of Cars and if it is below the number of carsPerPage + 1 then it is disabled
  const numOfPages = () => {
    setTotalPages(Math.ceil(carCount.length / carsPerPage));
    return Math.ceil(carCount.length / carsPerPage);
  }

  //since there is no brand of "all" I had to split this function into 2, where it checks if the current filter is set to all, then pulls all cars, otherwise it pulls the cars based on the currentFilter
  const filterAll = () => {
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
        .then(() => CallCarCountFunction())
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
        .then(() => CallCarCountFunction())
        .catch(console.error)
    }
  }

  // Sets the currentFilter state to "all"
  const setFilterToAll = () => {
    setCurrentFilter(prevFilter => prevFilter = "all");
  }

  // changes the filter state and resets the page number to 0
  const filterCar = (e) => {
    setPageNum(prevPageNum => prevPageNum = 0)
    setCurrentFilter(prevFilter => prevFilter = e.target.dataset.filter);
  }

  //The below sets the carCount based on the filters
  const CallCarCountFunction = () => {
    if (currentFilter == "all") {
      sanityClient
      .fetch(`*[_type == "car"]`)
      .then((data) => changeCarCount(data))
      .catch(console.error)
    } else {
      sanityClient
      .fetch(`*["${currentFilter}" in brand[]->name]`)
      .then((data) => changeCarCount(data))
      .catch(console.error)
    }
  }

  //----------------------------------------------------------
  //Initial pulls

  //sets the filters based on the car brands from the cms db
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "brand"]{name}`)
      .then((data) => setFilters(data))
      .catch(console.error)
  }, [])

  //initial setup of the carCount
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "car"]`)
      .then((data) => setCarCount(data))
      .catch(console.error)
  }, [])

  //---------------------------------------------------------
  // Repeated pulls

  // The below pulls only the cars for the current page, GROQ allows for start and end criteria when pulling data
  // it re-fetches the data, every time the pageNum or currentFilter states are changed
  useEffect(() => {
    filterAll()
  }, [pageNum, currentFilter]);
  //--------------------------------------------------------

  return (
    <main>
      {window.location.pathname === "/cars" ? <section> {/* This line exists because I need the /cars/:slug route to be protected, I couldn't find another way to protect it so I am using Outlet to render the child component of the /cars/ Route which is /cars/:slug */}
        <Banner orientation="right" title="FAST AND EASY WAY TO RENT A CAR" description="Looking for unbelievable prices on a car rental? Rent an exclusive set of cars and you are guaranteed to extract the most pristine experience out there! We work with top brands in the car industry to ensure your satisfaction." imgSrc="https://assets.webiconspng.com/uploads/2017/09/Ferrari-PNG-Image-68700.png"/>
        <section className='w-5/6 mx-auto bg-slate-700 text-white p-10'>
          <button className='bg-white px-5 py-2 text-black rounded-full hover:bg-slate-200 mr-5' onClick={setFilterToAll}>All</button>
          {filters && filters.map((filter) => <button data-filter={filter.name} className='bg-white px-5 py-2 text-black rounded-full hover:bg-slate-200 mr-5' onClick={filterCar} key={filter.name}>{filter.name}</button>)}
        </section>
        <div className='flex-row flex-wrap justify-evenly mb-8 px-20'>
          { carData && carData.map((car, index) => (
          <article className='w-1/4 inline-block p-2' key={index}>
            <Link to={"/cars/" + car.slug.current} key={car.slug.current}> {/* The Route has to be changed to /car/ + car.slug.current if I find a way to protect it without the use of Outlet, then in App.js the Route has to be on its own line and changed to path="/car/:slug" */}
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
          <button className={pageNum == 0 ? 'border-2 border-gray rounded p-4 bg-gray-600 text-white opacity-50 cursor-default' : 'border-2 border-gray rounded p-4 bg-gray-600 text-white hover:border-green-500'} disabled={pageNum == 0}  onClick={prevPage}>Prev Page</button>
          <button className={totalPages - 1 == pageNum || carCount && (carCount.length < 9) ? 'border-2 border-gray rounded p-4 bg-gray-600 text-white opacity-50 cursor-default' : 'border-2 border-gray rounded p-4 bg-gray-600 text-white hover:border-green-500'} disabled={carCount && (totalPages - 1 == pageNum || carCount.length < (carsPerPage + 1))} onClick={nextPage}>Next Page</button>
        </div>
      </section>
      : <Outlet />}
    </main>
  )
}