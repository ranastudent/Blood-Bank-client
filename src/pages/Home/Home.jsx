import React from 'react';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';
import { Helmet } from 'react-helmet-async';
import ContactMe from './Contact/ContactMe';

const Home = () => {
      return (
            <div>
                  <Helmet>
                        <title>Blood Bank || Home</title>
                  </Helmet>
                  <Banner></Banner>
                  <Feature></Feature>
                  <ContactMe></ContactMe>
            </div>
            
      );
};

export default Home;