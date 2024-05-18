const Footer = () => {
  return (
    <section className="mx-auto w-full bg-[#0d0d0d] text-white">
      <div className="flex flex-col justify-center gap-x-20 gap-y-10 p-10 sm:flex-row sm:p-20">
        <div className="flex w-[25%] flex-col items-start gap-3 text-lg font-normal tracking-widest sm:items-center">
          <p className=" mb-2 font-heading  text-3xl sm:text-4xl">Luxe</p>
          <p>Members</p>
          <p>Accounts</p>
          <p>Recruitment</p>
        </div>

        <div className="flex w-[25%] flex-col items-start gap-3 text-lg font-normal tracking-widest sm:items-center">
          <p className=" mb-2 font-heading text-3xl sm:text-4xl">Policy</p>
          <p>Shipping</p>
          <p>F&Q</p>
          <p>Terms&Conditions</p>
          <p>Policy</p>
        </div>

        <div className="flex w-[25%] flex-col items-start gap-3 text-lg font-normal tracking-widest sm:items-center">
          <p className=" mb-2 font-heading  text-3xl sm:text-4xl">
            Information
          </p>
          <p>About</p>
          <p>Blog</p>
          <p>Contact</p>
          <p>Product</p>
        </div>
      </div>

      <div className="w-full bg-white p-6 text-lg tracking-wider text-[#6a6868]">
        <p className="text-center">luxe 2024 | all right reserved</p>
      </div>
    </section>
  );
};

export default Footer;
