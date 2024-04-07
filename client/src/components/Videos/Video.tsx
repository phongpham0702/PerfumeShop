const Video = () => {
  return (
    <div className="mx-auto my-20 h-fit w-[80%]">
      <iframe
        className="h-[96vh] w-full rounded-md"
        src="https://www.youtube.com/embed/QQKrvFFxQxI?si=07Ba6C1E7WmnRrjy"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <div className="mx-auto my-20 flex max-w-[1280px] flex-col font-light">
        <p className="font-heading mb-10 text-center text-4xl font-normal tracking-wide">
          Why Choose Luxe Store
        </p>
        <div className="flex flex-nowrap gap-10 px-16">
          <div className="flex w-[33.33%] flex-col items-center justify-center">
            <img
              className="mb-6 h-[60px]"
              src="./images/grommet-icons_shield-security.svg"
              alt=""
            />
            <p className="mb-4 text-2xl">Genuine Product</p>
            <p className="">
              Perfume products are purchased directly at stores abroad or work
              directly with brands, guaranteed to be 100% authentic.
            </p>
          </div>
          <div className="flex w-[33.33%] flex-col items-center justify-center">
            <img
              className="mb-6 h-[60px]"
              src="./images/free-ship.svg"
              alt=""
            />
            <p className="mb-4 text-2xl">Free Shipping Nationwide</p>
            <p className="">
              Luke applies free shipping to all customers nationwide. We do not
              offer international shipping at this time
            </p>
          </div>
          <div className="flex w-[33.33%] flex-col items-center justify-center">
            <img className="mb-6 h-[60px]" src="./images/gift.svg" alt="" />
            <p className="mb-4 text-2xl">Close Members</p>
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
