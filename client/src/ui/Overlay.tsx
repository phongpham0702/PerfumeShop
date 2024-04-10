import React from "react";

type propsType = {
  isShow: boolean;
  children: React.ReactNode;
  bg: string;
};

const Overlay = ({ isShow, children, bg }: propsType) => {
  return (
    <div
      className={
        isShow
          ? `absolute left-0 top-0 flex h-[100%] w-[100%]  animate-[fadeIn_0.4s_ease-in-out]  justify-center rounded-md ${bg}`
          : "hidden"
      }
    >
      <div>{children}</div>
    </div>
  );
};

export default Overlay;
