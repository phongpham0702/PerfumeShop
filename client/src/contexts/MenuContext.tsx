import { ReactNode, createContext, useState } from "react";

interface MenuContextProps {
  id: string;
  isOpen: boolean;
  handleOpen: (id: string) => void;
  handleClose: () => void;
  handleToggle: () => void;
}

const MenuContext = createContext<MenuContextProps>({
  id: "",
  isOpen: false,
  handleOpen(id) {
    return id;
  },
  handleClose: () => {},
  handleToggle: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOpen = (id: string) => setId(id);

  const handleClose = () => setId("");

  return (
    <MenuContext.Provider
      value={{
        id,
        handleOpen,
        handleClose,
        isOpen,
        handleToggle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
