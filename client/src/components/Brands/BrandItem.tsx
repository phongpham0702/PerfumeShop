type AppProps = {
  logo: string;
};

const BrandItem = ({ logo }: AppProps) => {
  return <img className="self-center p-2" src={logo} alt="" />;
};

export default BrandItem;
