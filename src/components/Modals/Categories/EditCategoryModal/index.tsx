import { useFormik } from "formik";

import { useSwal } from "@/hooks/useSwal";

import Modal, { ModalProps } from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { api } from "@/services/api";
import { categoryInitialValues } from "@/utils/initialValues/category";
import { useEffect } from "react";

type Props = ModalProps & {
    category: Category;
    fetchCategories: () => Promise<void>;
};

export function EditCategoryModal({
    category,
    fetchCategories,
    ...rest
}: Props) {
    const { Toast } = useSwal();

    const formik = useFormik({
        initialValues: categoryInitialValues,
        async onSubmit(values) {
            try {
                await api.put(`/categories/${category.id}`, values);

                await fetchCategories();

                rest.onHide?.();
                
                Toast.fire({
                    icon: "success",
                    text: "Categoria editada com sucesso!",
                });
            } catch(error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        const categoryValues = Object(category);

        formik.setValues(categoryValues);
    }, [category]);

    useEffect(() => {
        if (!rest.show) {
            formik.setValues(categoryInitialValues);
        }
    }, [rest.show]);

    return (
        <Modal {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Editar categoria
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control {...formik.getFieldProps("name")} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control as="textarea" {...formik.getFieldProps("description")} />
                    </Form.Group>
                
                    <div className="d-flex justify-content-end">
                        <Button type="submit">Editar</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}