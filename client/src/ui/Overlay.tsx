type propsType = {
  isShow: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
  bg?: string;
};

const Overlay = ({ isShow, children, bg }: propsType) => {
  return (
    <div
      className={
        isShow
          ? `fixed left-0 top-0 z-[100] flex h-[100%] w-[100%] animate-[fadeIn_0.4s_ease-in-out]  justify-center rounded-md ${bg}`
          : " hidden animate-[fadeOut_0.4s_ease-in-out]"
      }
    >
      {children}
    </div>
  );
};

export default Overlay;
