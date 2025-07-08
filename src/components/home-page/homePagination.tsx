import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function HomePagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="mt-8 flex justify-center">
      {" "}
      <Pagination>
        {" "}
        <PaginationContent>
          {" "}
          <PaginationItem>
            {" "}
            <PaginationPrevious
              size={"sm"}
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />{" "}
          </PaginationItem>{" "}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }
            return (
              <PaginationItem key={pageNumber}>
                {" "}
                <PaginationLink
                  size={"sm"}
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className="cursor-pointer"
                >
                  {" "}
                  {pageNumber}{" "}
                </PaginationLink>{" "}
              </PaginationItem>
            );
          })}{" "}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              {" "}
              <PaginationEllipsis />{" "}
            </PaginationItem>
          )}{" "}
          <PaginationItem>
            {" "}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />{" "}
          </PaginationItem>{" "}
        </PaginationContent>{" "}
      </Pagination>{" "}
    </div>
  );
}
