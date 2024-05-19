// import { ReactNode, createContext, useState } from "react";

// const SearchContext = createContext({});

// export const SearchProvider = ({ children }: { children: ReactNode }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => setIsOpen(true);

//   const handleClose = () => setIsOpen(false);

//   const [searchVal, setSearchVal] = useState("");

//   const handleSearchVal = (val: string) => setSearchVal(val);

//   return (
//     <SearchContext.Provider
//       value={{
//         isOpen,
//         handleOpen,
//         handleClose,
//         searchVal,
//         handleSearchVal,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export default SearchContext;
