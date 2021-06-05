import React, { useState } from 'react';
import { pageSizes } from '../../config/values';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationBar = ({
  totalPages,
  handlePageChange,
  handlePageSizeChange,
  offset,
  pageSize,
  totalItems,
  currentPage,
  pageNumber,
  pageButtonOffset,
}) => {
  const pageItems = [];
  const PAGE_BUTTON_OFFSET = pageButtonOffset;
  const min = currentPage - PAGE_BUTTON_OFFSET;
  const max = currentPage + PAGE_BUTTON_OFFSET;
  for (let i = 1; i <= totalPages; i++) {
    if (i >= min && i <= max) {
      pageItems.push(i);
    }
  }
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="form-inline">
        <span>
          <window.t>Items Per Page</window.t>
        </span>
        <select className="form-control ml-2" onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="d-inline">
        <window.t>Showing</window.t> {offset + 1}
        {' - '}
        {offset + pageSize >= totalItems ? totalItems : offset + pageSize} <window.t>of</window.t> {totalItems}
      </div>
      <div>
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {min - 1 > 0 && (
            <PaginationItem disabled={true}>
              <PaginationLink disabled={true}>...</PaginationLink>
            </PaginationItem>
          )}
          {pageItems.map(item => {
            return (
              <PaginationItem active={item === currentPage} key={item}>
                <PaginationLink disabled={item === pageNumber} onClick={() => handlePageChange(item)}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {max < totalPages && (
            <PaginationItem disabled={true}>
              <PaginationLink disabled={true}>...</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

const usePagination = (defaultPageSize = 5, pageButtonOffset = 2) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPageNumber(1);
  };
  const handlePageChange = value => {
    setPageNumber(value);
  };
  const setPaginationValues = data => {
    setTotalItems(data.totalItems);
    setOffset(data.offset);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };
  return {
    totalPages,
    offset,
    pageSize,
    totalItems,
    currentPage,
    pageNumber,
    pageButtonOffset,
    setPageNumber,
    handlePageChange,
    handlePageSizeChange,
    setPaginationValues,
  };
};

export { PaginationBar, usePagination };
