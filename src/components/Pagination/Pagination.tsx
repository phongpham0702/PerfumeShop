import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { NavLink, useSearchParams } from "react-router-dom";
type propsType = {
  currentPage: string;
  totalPages: number;
  productNum: number;
};

const Pagination = ({ currentPage, totalPages, productNum }: propsType) => {
  const [searchParams] = useSearchParams();
  const filteredParams = new URLSearchParams();
  const [windowWidth, setWindowWidth] = useState(0);
  const pageNumbers: string[] = [];

  for (const [key, value] of searchParams.entries()) {
    if (value) filteredParams.set(key, value);
  }

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  let MAX_VISIBLE_PAGES;
  if (windowWidth <= 350) MAX_VISIBLE_PAGES = 1;
  if (windowWidth > 350 && windowWidth < 425) MAX_VISIBLE_PAGES = 3;
  if (windowWidth > 425) MAX_VISIBLE_PAGES = 5;

  const leftEllipsisNeeded: boolean =
    +currentPage > Math.ceil(MAX_VISIBLE_PAGES! / 2);

  const rightEllipsisNeeded: boolean =
    +currentPage < totalPages - Math.floor(MAX_VISIBLE_PAGES! / 2);

  // Handle left side with ellipsis (if needed)
  if (leftEllipsisNeeded) {
    pageNumbers.push("1");
    pageNumbers.push("...");
  }

  //   Generate middle visible pages
  const startIndex = Math.max(
    Math.ceil(+currentPage - (MAX_VISIBLE_PAGES! - 1) / 2),
    leftEllipsisNeeded ? 2 : 1,
  );
  const endIndex = Math.min(
    Math.floor(+currentPage + (MAX_VISIBLE_PAGES! - 1) / 2),
    totalPages - (rightEllipsisNeeded ? 1 : 0),
  );

  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(i.toString());
  }

  //   Handle right side with ellipsis (if need)
  if (rightEllipsisNeeded) {
    pageNumbers.push("...");
    pageNumbers.push(totalPages.toString());
  }

  return (
    <div className="mx-auto mb-10 mt-14 flex w-full justify-center text-xl">
      <ul className="flex gap-6">
        {+currentPage > 1 && (
          <NavLink
            to={`/shop/${+currentPage - 1}?${filteredParams.toString()}`}
            className="cursor-pointer pt-[4px]"
          >
            <FaAngleLeft />
          </NavLink>
        )}

        {productNum > 0 &&
          pageNumbers.map((pageNumber, index) => (
            <li key={pageNumber + index}>
              {pageNumber === "..." ? (
                pageNumber
              ) : (
                <NavLink
                  className="aria-[current=page]:rounded-md aria-[current=page]:border-2 aria-[current=page]:border-[#f8b500] aria-[current=page]:px-4 aria-[current=page]:py-3 aria-[current=page]:font-medium"
                  to={`/shop/${pageNumber}?${filteredParams.toString()}`}
                >
                  {pageNumber}
                </NavLink>
              )}
            </li>
          ))}

        {+currentPage < totalPages && (
          <NavLink
            to={`/shop/${+currentPage + 1}?${filteredParams.toString()}`}
            className="cursor-pointer pt-[4px]"
          >
            <FaAngleRight />
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
