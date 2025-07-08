/* eslint-disable no-unused-vars */
import React from "react";
import HeroSection from "./HeroSection";
import HowitWorks from "./HowitWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";


const Home = () => {
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowitWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};
 
export default Home;