import { FaLocationDot, FaMobileScreen, FaRegEnvelope } from "react-icons/fa6";
const Contact = () => {
  return (
    <div className="mx-auto my-20 flex max-w-[1280px] flex-col items-center gap-4 text-xl font-light">
      <p className="mb-4 text-4xl font-normal">Luke Store</p>
      <div className="flex gap-4">
        <i>
          <FaLocationDot />
        </i>
        19 Đ. Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Vietnam
      </div>
      <div className="flex gap-4">
        <i>
          <FaMobileScreen />
        </i>
        <p>0352568244 | 0909233651</p>
      </div>
      <div className="flex gap-4">
        <i>
          <FaRegEnvelope />
        </i>
        <p>luke09@gmail.com</p>
      </div>
      <p>Open time: Everyday from 9.00 - 21.00</p>
    </div>
  );
};

export default Contact;
