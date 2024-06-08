import MenuContext from "../../contexts/MenuContext";
import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";

type PropsType = {
  url: string;
  children: ReactNode;
};

const OffCanvasMenuItem = ({ url, children }: PropsType) => {
  const { handleClose } = useContext(MenuContext);

  return (
    <NavLink
      onClick={handleClose}
      className="cursor-pointer border-0 border-b-[1px] pb-1 aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
      to={url}
    >
      {children}
    </NavLink>
  );
};

export default OffCanvasMenuItem;
