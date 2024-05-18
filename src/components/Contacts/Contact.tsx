import { FaMobileScreen, FaRegEnvelope } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
const Contact = () => {
  return (
    <div className="mx-auto my-20 flex max-w-[1280px] flex-col items-center gap-4 text-xl font-light">
      <p className="mb-4 font-heading text-3xl tracking-wide sm:text-4xl">
        Luxe Store
      </p>
      <div className="flex items-center gap-4">
        <span className="text-2xl">
          <HiOutlineLocationMarker />
        </span>
        19 Đ. Nguyễn Hữu Thọ, Tân Hưng, <br className="block sm:hidden" /> Quận
        7, Thành phố Hồ Chí Minh
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl">
          <FaMobileScreen />
        </span>
        <p>0352568244 | 0909233651</p>
      </div>
      <div className="flex items-center gap-4">
        <FaRegEnvelope />
        <p>luke09@gmail.com</p>
      </div>
      <p>Open time: Everyday from 9.00 - 21.00</p>
    </div>
  );
};

export default Contact;
