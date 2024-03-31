type AppProps = {
  logo: string;
};

const BrandItem = ({ logo }: AppProps) => {
  return <img className="w-[100%] self-center p-2" src={logo} alt="" />;
};

export default BrandItem;
