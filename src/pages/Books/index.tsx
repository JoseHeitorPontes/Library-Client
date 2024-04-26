import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { FaEye, FaTrash } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";

import { api } from "@/services/api";
import { Pagination } from "@/components/Pagination";

type BooksPagination = GenericPagination<Book>;

export function Books() 
{
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [booksPagination, setBooksPagination] = useState<BooksPagination>({} as BooksPagination);

    async function fetchBooks() {
        try {
            setIsLoading(true);

            const { data } = await api.get<BooksPagination>("/books", {
                params: {
                    page,
                }
            });

            setBooksPagination(data);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [page]);

    return (
        <Container fluid>
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
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Autor</th>
                                    <th>Editora</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {booksPagination.data?.map((book) => (
                                    <tr key={book.id}>
                                        <td></td>
                                        <td>{book.name}</td>
                                        <td>{book.category.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publishingCompany}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <Button>
                                                    <FaEye />
                                                </Button>

                                                <Button variant="success">
                                                    <BiSolidEdit />
                                                </Button>

                                                <Button variant="danger">
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Pagination pageCount={booksPagination.meta.total} />
                    </>
                ) : (
                    <div className="text-center text-secondary fw-bold">Sem categorias cadastradas.</div>
                )
            )}
        </Container>
    );
}