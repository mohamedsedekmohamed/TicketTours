import React from 'react';

import Footer from '../Footer'
import Main from './Parts/Main';
import Categories from './Parts/Categories';
import Trips from './Parts/Trips';
import Questions from './Parts/Questions';
import Adventure from './Parts/Adventure';
import Say from './Parts/Say';

const Home = () => {
   



  return (
    <div className='w-screen min-h-screen '>
      <Main/>
{/*  */}
  <Categories/>
      {/*  */}
        <Trips/>
      {/*  */}
         <Questions/>
      {/*  */}
         <Adventure/>
      {/*  */}
         <Say/>
      <Footer/>
    </div>
  );
};

export default Home;
