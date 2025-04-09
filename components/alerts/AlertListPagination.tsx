import React from "react";
import clsx from "clsx";

type AlertListPaginationProps = {
  alertsPerPage: number;
  totalAlerts: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export function AlertListPagination({
  alertsPerPage,
  totalAlerts,
  setCurrentPage,
  currentPage,
}: AlertListPaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlerts / alertsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (
    pageNumber: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="flex h-8 items-center justify-center pt-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={clsx(
              "hover:bg-soft-hover flex h-8 items-center justify-center px-3",
              { ["bg-soft-active font-semibold"]: currentPage === number },
            )}
          >
            <a onClick={(e) => paginate(number, e)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
