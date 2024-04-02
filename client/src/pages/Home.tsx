import BrandList from "../components/Brands/BrandList";
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
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
