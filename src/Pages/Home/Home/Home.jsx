import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import WhyChooseUs from './WhyChooseUs/WhyChooesUs';
import Banner from './Banner/Banner';
import OverviewSection from './OverviewSection/OverviewSection';
import WhyPeopleLove from './WhyPeopleLove/WhyPeopleLove';

const Home = () => {
    return (
        <div className='mb-5 mt-6 space-y-14'>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <WhyPeopleLove></WhyPeopleLove>
            <PopularDestinations></PopularDestinations>
            <WhyChooseUs></WhyChooseUs>
        </div> 
    );
};

export default Home;