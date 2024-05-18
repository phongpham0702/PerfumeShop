import { useEffect, useState } from "react";

// type propsType = {
//   ref: React.RefObject<HTMLDivElement>;
//   firstLoadAnimate: string;
// };

const useHover = (ref: React.RefObject<HTMLDivElement>) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  useEffect(() => {
    let timeoutId: number;
    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => setIsHover(true), 250);
    };
    const handleMouseLeave = () => {
      clearTimeout(timeoutId);
      setIsHover(false);
    };

    const currentRef = ref.current;
    // currentRef?.classList.remove(firstLoadAnimate);

    currentRef?.addEventListener("mouseenter", handleMouseEnter);
    currentRef?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentRef?.removeEventListener("mouseenter", handleMouseEnter);
      currentRef?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
  return isHover;
};

export default useHover;
