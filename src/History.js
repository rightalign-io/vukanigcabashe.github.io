import React from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';

function History ({currentArticles}){
  const data = currentArticles;  
  // search logic.
  const [name, setName] = useState('');
  const [article, setArticle] = useState('');
  // the search result
  
  const [foundArticles, setFoundArticles] = useState(data?.data);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = data.filter((article) => {
        return article.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundArticles(results);
    } else {
      setFoundArticles(data?.data);
      // If the text field is empty, show all articles
    }
    setName(keyword);
  };

  return (
    <div className='container'> 
     <div className='flex my-14'>
        <div className='text-left w-full my-2'>
          <h1 className='mr-14 uppercase pb-3 font-bold text-2xl'>History </h1>
        </div>
        <div className="relative w-1/2">
          <form className="flex items-center">   
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text"  value={name} onChange={filter}
                className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required="" />
                <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                </button>
            </div>    
          </form>
        </div>
      </div>
      <div>
      <div>
        <div className='flex'>
          { foundArticles && foundArticles.length > 0 ? (
            foundArticles.map((article, index) => (
              <>
                   <div className='flex 3' key={index} >
                    {/* remove the border n shadow & index after setting up */}
                    <div className="mx-2 grid overflow-hidden flex justify-items-center">
                        {/* will add onerror that works correctly after all other things work */}
                        {/* <img src={article.flickr_images[0]} onError={({ currentTarget }) => { currentTarget.src="https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg";}} className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rocks - spaceX'/> */}
                        <img src='https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg'  className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rock1'/>
                        <div className="px-6 mt-8">
                            <h3 className="text-ellipsis truncate h-14 capitalize font-bold text-xl">{article.title} {index}</h3>
                        </div>
                        <div className="overflow-hidden px-2 mb-5">
                            <p className="text-ellipsis h-6 font-normal max-w-sm rounded-md px-3 text-xl text-black mr-2 mb-8"> { article.details } </p>
                        </div>
                        <Link to={article.links.article} className='w-full' _target="blank">
                          <button className="uppercase mb-4 justify-self-center bg-black hover:bg-blue-700 text-white font-bold py-2 rounded w-11/12">  view article </button>
                        </Link>
                    </div>
                  </div>
                  </>
            ))
          ) : (
            <div className="flex">{
              name == "" && data?.map((article, index) => { 
                return (<>
                  <div className='flex 3' key={index} >
                    {/* remove the border n shadow & index after setting up */}
                    <div className="mx-2 grid overflow-hidden flex justify-items-center">
                        {/* will add onerror that works correctly after all other things work */}
                        {/* <img src={article.flickr_images[0]} onError={({ currentTarget }) => { currentTarget.src="https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg";}} className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rocks - spaceX'/> */}
                        <img src='https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg'  className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl" alt='rock1'/>
                        <div className="px-6 mt-8">
                            <h3 className="text-ellipsis truncate h-14 capitalize font-bold text-xl">{article.title} {index}</h3>
                        </div>
                        <div className="overflow-hidden px-2 mb-5">
                            <p className="text-ellipsis h-6 font-normal max-w-sm rounded-md px-3 text-xl text-black mr-2 mb-8"> { article.details } </p>
                        </div>
                        <Link to={article.links.article} className='w-full' _target="blank">
                          <button className="uppercase mb-4 justify-self-center bg-black hover:bg-blue-700 text-white font-bold py-2 rounded w-11/12">  view article </button>
                        </Link>
                    </div>
                  </div>
                </>)
              })  
            }</div>
          )}
        </div>
      </div>
      
      </div>  
    </div>
  )
}

const HistoryComponent = () => {
  const {loading, error, data} = useQuery(['history'], () => {return axios.get("https://api.spacexdata.com/v4/history")});
  
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
      <History currentArticles={currentItems} />
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

export default HistoryComponent
