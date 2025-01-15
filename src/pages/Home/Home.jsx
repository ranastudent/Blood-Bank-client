import React from 'react';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';
import Contact from './Contact/Contact';
import { Helmet } from 'react-helmet-async';

const Home = () => {
      return (
            <div>
                  <Helmet>
                        <title>Blood Bank || Home</title>
                  </Helmet>
                  <Banner></Banner>
                  <Feature></Feature>
                  <Contact></Contact>
            </div>
            
      );
};

export default Home;