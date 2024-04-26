import { useEffect } from "react";
import { useFormik } from "formik";

import Modal, { ModalProps } from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { api } from "@/services/api";
import { useSwal } from "@/hooks/useSwal";
import { categoryInitialValues } from "@/utils/initialValues/category";

type Props = ModalProps & {
    fetchCategories: () => Promise<void>;
};

export function NewCategoryModal({
    fetchCategories,
    ...rest
}: Props) {
    const { Toast } = useSwal();

    const formik = useFormik({
        initialValues: categoryInitialValues,
        async onSubmit(values) {
            try {
                await api.post("/categories", values);

                fetchCategories();

                rest.onHide?.();

                formik.resetForm();

                Toast.fire({
                    icon: "success",
                    text: "Categoria cadastrada com sucesso!",
                });
            } catch(error) {
                console.log(error);
            }
        } 
    });

    useEffect(() => {
        formik.resetForm();
    }, [rest.show]);

    return (
        <Modal {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>Nova categoria</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control {...formik.getFieldProps("name")} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control {...formik.getFieldProps("description")} />
                    </Form.Group>

                    <Form.Group className="d-flex gap-2 align-items-center mb-4">
                        <Form.Label>Ativar:</Form.Label>
                        <Form.Check type="switch" />
                    </Form.Group>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}