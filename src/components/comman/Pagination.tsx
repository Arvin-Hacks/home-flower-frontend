// Pagination.tsx

import React from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Function to generate an array of page numbers
  const generatePageNumbers = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    // <div className="pagination flex items-center justify-center space-x-4">
    //   {/* Previous Page Button */}
    //   <button
    //     className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
    //     onClick={() => onPageChange(currentPage - 1)}
    //     disabled={currentPage === 1}
    //   >
    //     Previous
    //   </button>

    //   {/* Page Number Buttons */}
    //   {generatePageNumbers(totalPages).map((page) => (
    //     <button
    //       key={page}
    //       className={`pagination-item ${currentPage === page ? 'active' : ''
    //         }`}
    //       onClick={() => onPageChange(page)}
    //     >
    //       {page}
    //     </button>
    //   ))}

    //   {/* Next Page Button */}
    //   <button
    //     className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''
    //       }`}
    //     onClick={() => onPageChange(currentPage + 1)}
    //     disabled={currentPage === totalPages}
    //   >
    //     Next
    //   </button>

    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          {generatePageNumbers(totalPages).map((page) => (
            // <button
            //   key={page}
            //   className={`pagination-item ${currentPage === page ? 'active' : ''
            //     }`}
            //   onClick={() => onPageChange(page)}
            // >
            //   {page}
            < PaginationLink onClick={() => onPageChange(page)} className={`${currentPage === page ? 'bg-gray-2 00' : ''
              }`}>
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className={` ${currentPage === totalPages ? 'disabled' : ''
            }`}
            onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    // </div >
  );
};

export default PaginationComponent;
