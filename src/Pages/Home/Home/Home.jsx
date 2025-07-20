import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import WhyChooseUs from './WhyChooseUs/WhyChooesUs';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularDestinations></PopularDestinations>
            <WhyChooseUs></WhyChooseUs>
        </div> 
    );
};

export default Home;