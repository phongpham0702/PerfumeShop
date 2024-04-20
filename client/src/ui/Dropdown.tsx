import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

type propsType = {
  items: {
    location: string;
    title: string;
    isSelected: boolean;
    value: string;
  }[];
};

const Dropdown = ({ items }: propsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (id: string, selectedVal: string, title: string) => {
    setIsOpen(false);
    setTitle(title);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);

      updatedParams.delete(id);
      updatedParams.set(id, selectedVal.toString());
      return updatedParams;
    });
  };

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLDivElement))
        setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isOpen, ref]);

  return (
    <>
      <div
        ref={ref}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-sm border border-[#333] p-2 text-lg font-semibold sm:w-[200px] sm:px-4"
      >
        <div>
          <p className=" text-sm sm:block">Sort by</p>
          <p className="font-light">{title}</p>
        </div>
        <span className="text-[1rem]">
          <FaAngleDown />
        </span>
      </div>
      {isOpen ? (
        <div className="absolute z-20 w-full rounded-md  bg-[#fff] shadow">
          {items.map(({ location, value, title }) => (
            <option
              onClick={() => handleChange(location, value, title)}
              className="cursor-pointer p-2 hover:bg-[#f8b500] hover:text-[#fff]"
              key={title}
            >
              {title}
            </option>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dropdown;
