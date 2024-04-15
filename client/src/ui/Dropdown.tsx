import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (id: string, selectedVal: string) => {
    setIsOpen(false);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);

      updatedParams.append(id, selectedVal.toString());
      return updatedParams;
    });
  };
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //         setIsComponentVisible(false);
  //     }
  // };

  useEffect(() => {
    // document.addEventListener('click', handleClickOutside, true);
    // return () => {
    //     document.removeEventListener('click', handleClickOutside, true);
    // };
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isOpen, ref]);

  return (
    <div className="relative ">
      <div
        ref={ref}
        onClick={() => {
          console.log("hello");

          setIsOpen((prev) => !prev);
        }}
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
        <div className="absolute z-10 w-[200px] rounded-md  bg-[#fff] shadow">
          {items.map((item) => (
            <option
              onClick={() => handleChange(item.location, item.value)}
              className="cursor-pointer p-2 hover:bg-[#f8b500] hover:text-[#fff]"
              key={item.title}
            >
              {item.title}
            </option>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
