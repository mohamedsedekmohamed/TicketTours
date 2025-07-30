import React, { useEffect, useState } from 'react';

import Footer from '../Footer'
import Main from './Parts/Main';
import Categories from './Parts/Categories';
import Trips from './Parts/Trips';
import Questions from './Parts/Questions';
import Adventure from './Parts/Adventure';
import Say from './Parts/Say';
import Loading from '../../../ui/Loading'
import axios from 'axios';

const Home = () => {
   const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
   
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bcknd.tickethub-tours.com/api/user/landpage/images'); // غير الرابط حسب احتياجك
        setData(response.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return (
  <div className='w-screen h-screen'>
<Loading/>
  </div>
  );
  return (
    <div className='w-screen min-h-screen '>
      <Main data={data}/>
{/*  */}
  <Categories  data={data.categories}/>
      {/*  */}
        <Trips/>
      {/*  */}
         <Questions data={data.faqs}/>
      {/*  */}
         <Adventure/>
      {/*  */}
         <Say/>
      <Footer/>
    </div>
  );
};

export default Home;
