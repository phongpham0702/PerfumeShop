import BrandList from "../components/Brands/BrandList";
import Contact from "../components/Contacts/Contact";
import Footer from "../components/Footer/Footer";
import ProductList from "../components/Products/ProductList";
import Subscribe from "../components/Subscribe/Subscribe";
import Video from "../components/Videos/Video";

const Home = () => {
  return (
    <>
      <BrandList />
      <hr />
      <ProductList />
      <hr />
      <Video />
      <hr />
      <Contact />
      <hr />
      <Subscribe />

      <Footer />
    </>
  );
};

export default Home;
