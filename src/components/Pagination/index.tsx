import ReactPaginate from "react-paginate";

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

type Props = {
    pageCount: number;
};

export function Pagination({
    pageCount
}: Props)
{
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
            pageCount={pageCount}
        />
    );
}