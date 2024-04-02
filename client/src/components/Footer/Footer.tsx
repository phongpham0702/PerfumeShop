const Footer = () => {
  return (
    <section className="container mx-auto bg-[#0d0d0d] text-white">
      <div className="flex justify-center gap-20 p-20">
        <div className="flex w-[25%] flex-col items-center gap-3 text-lg font-normal tracking-widest">
          <p className="mb-2 text-4xl font-light">Luxe</p>
          <p>Members</p>
          <p>Accounts</p>
          <p>Recruitment</p>
        </div>
        <div className="flex w-[25%] flex-col items-center gap-3 text-lg font-normal tracking-widest">
          <p className="mb-2 text-4xl font-light">Policy</p>
          <p>Shipping</p>
          <p>F&Q</p>
          <p>Terms & Conditions</p>
          <p>Policy</p>
        </div>
        <div className="flex w-[25%] flex-col items-center gap-3 text-lg font-normal tracking-widest">
          <p className="mb-2 text-4xl font-light">Information</p>
          <p>About</p>
          <p>Blog</p>
          <p>Contact</p>
          <p>Product</p>
        </div>
      </div>
      <div className="w-full bg-white p-12 text-lg tracking-wider text-[#6a6868]">
        <p className="text-center">luxe 2024 | all right reserved</p>
      </div>
    </section>
  );
};

export default Footer;
