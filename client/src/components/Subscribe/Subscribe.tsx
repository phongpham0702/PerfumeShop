const Subscribe = () => {
  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-light">BECOME A MEMBER & GET 15% OFF</p>
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
    </div>
  );
};

export default Subscribe;
