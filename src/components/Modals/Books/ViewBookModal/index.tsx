import Modal, { ModalProps } from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { imageUrl } from "@/services/imageUrl";

type Props = ModalProps & {
    book: Book;
};

export function ViewBookModal({
    book,
    ...rest
}: Props)
{
    return (
        <Modal {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>{book?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-2">
                    <span className="fw-bold">Autor: </span>
                    {book?.author}
                </div>

                <div className="mb-2">
                    <span className="fw-bold">Editora: </span>
                    {book?.publishingCompany}
                </div>

                <div className="mb-4">
                    <span className="fw-bold">Categoria: </span>
                    {book?.category?.name}
                </div>

                <div className="d-flex gap-4 mb-4">
                    <Image 
                        className="h-150px w-300px rounded"
                        src={`${imageUrl}/books/${book?.image}`}
                    />

                    <p>{book?.synpose}</p>
                </div>

                <div className="d-flex justify-content-center">
                    <Button variant="dark" onClick={() => rest.onHide?.()}>Fechar</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}