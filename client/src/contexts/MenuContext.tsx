import { ReactNode, createContext, useState } from "react";

interface MenuContextProps {
  id: string;
  handleOpen: (id: string) => void;
  handleClose: () => void;
}

const MenuContext = createContext<MenuContextProps>({
  id: "",
  handleOpen(id) {
    return id;
  },
  handleClose: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = (id: string) => setId(id);

  // const handleOpen = () => setIsOpen(true);

  const handleClose = () => setId("");

  return (
    <MenuContext.Provider value={{ id, handleOpen, handleClose }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
