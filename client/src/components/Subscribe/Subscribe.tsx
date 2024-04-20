import { FaYoutube, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";

const Subscribe = () => {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center font-sans">
      <p className="mb-4 px-4 text-center font-heading text-2xl tracking-wide sm:px-0 sm:text-3xl">
        BECOME A MEMBER TO GET <br className="block sm:hidden" /> 15% OFF
      </p>
      <form
        className="justify-centers flex flex-col flex-wrap items-center gap-4 sm:flex-row"
        action=""
      >
        <input
          className="w-[300px] border-b border-[#333] outline-none sm:w-[300px]"
          type="email"
          name="email"
          placeholder="Enter your email "
        />
        <button className="rounded-md border border-[#333] px-6 py-2 hover:opacity-[0.7] sm:px-6 sm:py-2">
          Subscribe
        </button>
      </form>

      <div className="mt-20 flex cursor-pointer items-center justify-center gap-4 text-3xl">
        <FaYoutube className="mt-[2px] text-[2.15rem]" />
        <FaFacebook />
        <FaTiktok />
        <FaInstagram />
      </div>
    </div>
  );
};

export default Subscribe;
