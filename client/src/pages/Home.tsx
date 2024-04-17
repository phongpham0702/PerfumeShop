import BrandList from "../components/Brands/BrandList";
import Contact from "../components/Contacts/Contact";
import BestsellerList from "../components/Products/BestsellerList";
import NewArrival from "../components/Products/NewArrival";
import Video from "../components/Videos/Video";

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
