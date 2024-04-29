import { useEffect, useRef, useState } from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FaEye, FaTrash } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";

import { api } from "@/services/api";

import { Pagination } from "@/components/Pagination";
import { ViewBookModal } from "@/components/Modals/Books/ViewBookModal";

type BooksPagination = GenericPagination<Book>;

export function Books() 
{
    const [isLoading, setIsLoading] = useState(true);

    const forcePage = useRef(1);
    const [page, setPage] = useState(1);
    const [booksPagination, setBooksPagination] = useState<BooksPagination>({} as BooksPagination);

    const [selectedBook, setSelectedBook] = useState<Book>({} as Book);
    const [showViewBookModal, setShowViewBookModal] = useState(false);
    function handleShowViewBookModal(book: Book) {
        setSelectedBook(book);
        setShowViewBookModal(true);
    }
    const handleCloseViewBookModal = () => setShowViewBookModal(false);

    async function fetchBooks(pageToUse?: number) {
        try {
            setIsLoading(true);

            const { data } = await api.get<BooksPagination>("/books", {
                params: {
                    page: pageToUse || page,
                }
            });

            setBooksPagination(data);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handlePageChange(selected: number) {
        if (page !== forcePage.current) {
            fetchBooks(selected);
            forcePage.current = selected;

            return;
        }

        setPage(selected);
    }

    useEffect(() => {
        forcePage.current = page;
        fetchBooks();
    }, [page]);

    return (
        <Container fluid>
            <ViewBookModal book={selectedBook} show={showViewBookModal} onHide={handleCloseViewBookModal} />

            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                Boolean(booksPagination.data.length) ? (
                    <>
                        <Table bordered striped className="text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Autor</th>
                                    <th>Editora</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {booksPagination.data?.map((book, index) => (
                                    <tr key={book.id}>
                                        <td>{index + 1}</td>
                                        <td>{book.name}</td>
                                        <td>{book.category.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publishingCompany}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            Ver
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button onClick={() => handleShowViewBookModal(book)}>
                                                        <FaEye />
                                                    </Button>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            Editar
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="success">
                                                        <BiSolidEdit />
                                                    </Button>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            Deletar
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="danger">
                                                        <FaTrash />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Pagination
                            itemsPerPage={10}
                            totalItems={booksPagination.meta.total}
                            forcePage={forcePage.current - 1}
                            changeSelectedPage={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center text-secondary fw-bold">Sem categorias cadastradas.</div>
                )
            )}
        </Container>
    );
}