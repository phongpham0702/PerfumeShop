import React from "react";
import Contact from "../components/Contacts/Contact";
import BestsellerList from "../components/Products/BestsellerList";
import NewArrival from "../components/Products/NewArrival";
import Video from "../components/Videos/Video";
import FamousBrands from "../components/Brands/FamousBrands";

const Home = () => {
  return (
    <>
      <FamousBrands />
      <hr />
      <BestsellerList />
      <hr />
      <NewArrival />
      <hr />
      <Video />
      <hr />
      <Contact />
      <hr />
    </>
  );
};

export default Home;
