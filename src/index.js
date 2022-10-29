import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

const Footer = () => {
  return <>
    <div className='h-24 pt-8 bg-black uppercase text-white text-lg text-center w-full'> spacex explorere @ 2022 </div>
  </>
}

render((
  <BrowserRouter>
    <App />
    <Footer/>
  </BrowserRouter>
), document.getElementById('root'));

