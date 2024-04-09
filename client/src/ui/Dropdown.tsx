import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

type propsType = {
  headTitle: string;
  items: {
    location: string;
    title: string;
    isSelected: boolean;
    value: string;
  }[];
};

const Dropdown = ({ items, headTitle }: propsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const handleChange = (id: string, selectedVal: string) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);

      updatedParams.append(id, selectedVal.toString());
      return updatedParams;
    });
  };
  const handleToggle = () => {
    setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        window.addEventListener("click", () => setIsOpen(false));
      }
    }, 0);
  };

  return (
    <div className="relative ">
      <div
        onClick={() => handleToggle()}
        className="flex h-[50px] w-[200px] cursor-pointer items-center justify-between rounded-sm border border-[#333] px-4 py-2 text-lg font-semibold"
      >
        <div>
          <p className="text-sm">Sort by</p>
          <p className="font-light">{headTitle}</p>
        </div>
        <i className="text-[1rem]">
          <FaAngleDown />
        </i>
      </div>
      {isOpen ? (
        <ul className="absolute z-10 w-[200px] rounded-md  bg-[#fff] shadow">
          {items.map((item) => (
            <li
              onClick={() => handleChange(item.location, item.value)}
              className="cursor-pointer p-2 hover:bg-[#f8b500] hover:text-[#fff]"
              key={item.title}
            >
              {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
