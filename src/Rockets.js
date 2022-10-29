// import Card from './Card';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';

function getKg(mass){ return (mass*9.80).toFixed(1)};

const Rockets = ({currentRockets}) => {
  const data = currentRockets;
  // search logic.
  const [name, setName] = useState('');
  const [rocket, setRocket] = useState('');
  // the search result
  
  const [foundRockets, setFoundRockets] = useState(data?.data);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = data.filter((rocket) => {
        return rocket.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundRockets(results);
    } else {
      setFoundRockets(data?.data);
      // If the text field is empty, show all rockets
    }
    setName(keyword);
  };

  return (
    <div> 
      <div className='flex'>
        <div className='text-left w-full my-2'>
        <h1 className='ml-24 uppercase pb-3 font-bold text-xl'>Rockets </h1>
      </div>
        <div className="relative w-1/2">
          <form className="flex items-center">   
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text"  value={name} onChange={filter}
                className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-3/4 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required="" />
                <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                </button>
            </div>    
          </form>
        </div>
      </div>
      <div>
      <div className="container">
        <div className="flex">
          { foundRockets && foundRockets.length > 0 ? (
            foundRockets.map((rocket) => (
              <div className=' gap-2' key={rocket.id} >
                
                <div className="mx-2 grid max-w-sm rounded ">
                    <img src='https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg' className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rock1'/>
                    <div className="px-6 my-4">
                        <h3 className="uppercase text-left font-bold text-xl mb-2">{rocket.name}</h3>
                    </div>
                    <div className="px-2 text-left pt-2 pb-2">
                        <p className="uppercase font-bold block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2">height: { rocket.height.feet } M</p>
                        <p className="uppercase font-bold block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2">weight: { getKg(rocket.mass.kg   ) } KG</p>
                    </div>
                    <button className="uppercase mb-4 justify-self-center bg-black hover:bg-blue-700 text-white font-bold py-2 rounded w-11/12">  learn more </button>
                </div>
              </div>
              
            ))
          ) : (
            <div className="grid grid-cols-3 gap-2">{
              name == "" && data?.map((rocket, index) => { 
                return (
                  <div className='' key={index} >
                    
                    <div className="mx-2 grid max-w-sm rounded ">
                        <img src='https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg' className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rock1'/>
                        <div className="px-6 my-4">
                            <h3 className="uppercase text-left font-bold text-xl mb-2">{rocket.name}</h3>
                        </div>
                        <div className="px-2 text-left pt-2 pb-2">
                            <p className="uppercase font-bold block rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">height: { rocket.height.feet } M</p>
                            <p className="uppercase font-bold block rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">weight: { rocket.mass.kg } KG</p>
                        </div>
                        <button className="uppercase mb-4 justify-self-center bg-black hover:bg-blue-700 text-white font-bold py-2 rounded w-11/12">  learn more </button>
                    </div>
                  </div>
                )
              }) 
            }</div>
          )}
        </div>
      </div>
      </div>  
    </div>
  )
}

const RocketsComponent = () => {
  const {loading, error, data} = useQuery(['rockets'], () => {return axios.get("https://api.spacexdata.com/v4/rockets")});

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data?.data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Rockets currentRockets={currentItems} />
      <div className='flex justify-items-ceneter mx-auto my-6'>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination flex mx-auto"
        pageLinkClassName="page-num mx-3"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activee boxx font-bold"
        />
      </div>
    </>
  );
};

export default RocketsComponent