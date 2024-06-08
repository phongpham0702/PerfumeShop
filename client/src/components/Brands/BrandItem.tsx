import { Link } from "react-router-dom";

type AppProps = {
  logo: string;
  name: string;
};

const BrandItem = ({ logo, name }: AppProps) => {
  return (
    <Link to={`/shop/1?brand=${name}`} className="self-center">
      <img className="self-center p-2" src={logo} alt="" />
    </Link>
  );
};

export default BrandItem;
