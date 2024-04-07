import { FaYoutube, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";

const Subscribe = () => {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center font-sans">
      <p className="font-heading mb-4 text-3xl tracking-wide">
        BECOME A MEMBER TO GET 15% OFF
      </p>
      <form className="flex gap-4" action="">
        <input
          className="w-[300px] border-b border-[#333] outline-none"
          type="email"
          name="email"
          id=""
          placeholder="Your email "
        />
        <button className="rounded-md border border-[#333] px-6 py-2 hover:opacity-[0.7]">
          Subscribe
        </button>
      </form>

      <div className="mt-20 flex cursor-pointer items-center justify-center gap-4 text-3xl">
        <i>
          <FaYoutube className="mt-[2px] text-[2.15rem]" />
        </i>
        <i>
          <FaFacebook />
        </i>
        <i>
          <FaTiktok />
        </i>
        <i>
          <FaInstagram />
        </i>
      </div>
    </div>
  );
};

export default Subscribe;
