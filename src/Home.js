import React from 'react';
import ShipsComponent from './Ships';
import RocketsComponent from './Rockets';

const Home = () => {
  
  // get the kg of that specific mass and round it to nearest integer.
  function getKg(mass){ return (mass*9.80).toFixed(1)};
                                                                                                                    
  return (
    <div className='w-full' >
      <div className='mx-8 grid '> 
        <RocketsComponent />
        <ShipsComponent /> 
      </div>
    </div>
  )
}

export default Home
