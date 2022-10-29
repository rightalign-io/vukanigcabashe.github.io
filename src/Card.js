import React from 'react';


function Card ({data}) { 
    const height = data.height;
    const weight = data.weight;
    const title = data.name;
   console.log('data', data)
    return (        
        <div className="grid max-w-sm rounded overflow-hidden shadow-lg">
            <img src='https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg' alt='rock1'/>
            <div className="px-6 py-4">
                <h3 className="uppercase font-bold text-xl mb-2">{title}</h3>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="uppercase font-bold block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">height: {height}</p>
                <p className="uppercase font-bold block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">weight: {weight}</p>
            </div>{/*  */}
            <button className="mb-4 justify-self-center bg-black hover:bg-blue-700 text-white font-bold py-2 rounded w-11/12">  Learn More </button>
        </div>
    )
}


export default Card

