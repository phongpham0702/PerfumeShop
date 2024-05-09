type AppProps = {
  logo: string;
};

const BrandItem = ({ logo }: AppProps) => {
  return (
    <img
      className="w-[100%] self-center p-2"
      loading="lazy"
      src={logo}
      alt=""
    />
  );
};

export default BrandItem;
