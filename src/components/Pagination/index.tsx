import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

type Props = {
    totalItems: number;
    itemsPerPage: number;
    forcePage?: number;
    changeSelectedPage: (page: number) => void;
};

type PageChangeEvent = {
	selected: number;
};

export function Pagination({
    totalItems,
    itemsPerPage,
    forcePage,
    changeSelectedPage,
}: Props) {
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const pages = Array.from({ length: totalItems }, (_, index) => index + 1);

    const handlePageClick = (event: PageChangeEvent) => {
		const newOffset = event.selected + 1;

		changeSelectedPage(newOffset);
		setItemOffset(newOffset);
	};

    useEffect(() => {
        setPageCount(Math.ceil(pages.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, totalItems]);

    return (
        <ReactPaginate
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            previousLabel={<GrPrevious />}
            nextClassName="page-item"
            nextLinkClassName="page-link"
            nextLabel={<GrNext />}
            activeClassName="active"
            forcePage={forcePage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
        />
    );
}