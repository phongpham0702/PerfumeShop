const Video = () => {
  return (
    <div className="mx-auto my-20 w-[95%] md:w-[80%]">
      <iframe
        className="h-[250px] w-full rounded-sm sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]"
        src="https://www.youtube.com/embed/QQKrvFFxQxI?si=07Ba6C1E7WmnRrjy"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <div className="mx-auto my-20 flex flex-col font-light">
        <p className="mb-10 text-center font-heading text-3xl font-normal tracking-wide sm:text-4xl">
          Why Choose Luxe <span className="block sm:hidden">Store</span>
        </p>

        <div className="flex flex-col flex-nowrap gap-10 px-4 sm:flex-row lg:px-16">
          <div className="flex flex-col items-center justify-center sm:w-[33.33%] sm:justify-start">
            <img
              className="mb-6 h-[60px]"
              src="./images/grommet-icons_shield-security.svg"
            />
            <p className="mb-4 text-center text-2xl sm:h-[60px] xl:h-[40px]">
              Genuine Product
            </p>
            <p className="">
              Perfume products are purchased directly at stores abroad or work
              directly with brands, guaranteed to be 100% authentic.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center sm:w-[33.33%] sm:justify-start">
            <img className="mb-6 h-[60px]" src="./images/free-ship.svg" />
            <p className="mb-4 text-center text-2xl sm:h-[60px] xl:h-[40px]">
              Free Shipping Nationwide
            </p>
            <p className="">
              Luke applies free shipping to all customers nationwide. We do not
              offer international shipping at this time
            </p>
          </div>

          <div className="flex flex-col items-center justify-center sm:w-[33.33%] sm:justify-start">
            <img className="mb-6 h-[60px]" src="./images/gift.svg" />
            <p className="mb-4 text-center text-2xl sm:h-[60px] xl:h-[40px]">
              Close Members
            </p>
            <p className="">
              Gold members will receive 5% discount/order. With silver members,
              customers receive a 3% discount/order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
