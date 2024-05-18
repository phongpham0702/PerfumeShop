import { ReactNode, createContext, useState } from "react";

const MenuContext = createContext({
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
