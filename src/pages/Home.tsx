import React, { Suspense } from "react";
import Contact from "../components/Contacts/Contact";
import BestsellerList from "../components/Products/BestsellerList";
import NewArrival from "../components/Products/NewArrival";
import Video from "../components/Videos/Video";
const BrandList = React.lazy(() => import("../components/Brands/BrandList"));

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandList />
      <hr />
      <BestsellerList />
      <hr />
      <NewArrival />
      <hr />
      <Video />
      <hr />
      <Contact />
      <hr />
    </Suspense>
  );
};

export default Home;
