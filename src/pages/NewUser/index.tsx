import { useFormik } from "formik";

import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { api } from "../../services/api";
import { useSwal } from "../../hooks/useSwal";
import { newUserInitialValues } from "../../utils/initialValues/newUser";
import { newUserSchema } from "../../utils/validations/newUserSchema";

export function NewUser()
{
    const navigate = useNavigate();
    const { Toast } = useSwal();

    const formik = useFormik({
        initialValues: newUserInitialValues,
        validationSchema: newUserSchema,
        async onSubmit(values) {
            try {
                const { data } = await api.post("/user", values);

                await Toast.fire({
                    icon: "success",
                    text: data.message,
                });

                navigate("/");
            } catch(error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center my-0">
            <Card className="col-4 p-4">
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center">Novo Usuário</h1>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Nome:</Form.Label>

                            <Form.Control {...formik.getFieldProps("name")} />

                            {formik.touched.name && formik.errors.name && (
                                <span className="text-danger fw-semibold">{formik.errors.name}</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Email:</Form.Label>

                            <Form.Control type="email" {...formik.getFieldProps("email")} />

                            {formik.touched.email && formik.errors.email && (
                                <span className="text-danger fw-semibold">{formik.errors.email}</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Senha:</Form.Label>

                            <Form.Control type="password" {...formik.getFieldProps("password")} />

                            {formik.touched.password && formik.errors.password && (
                                <span className="text-danger fw-semibold">{formik.errors.password}</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="fw-bold">Confirmar senha:</Form.Label>

                            <Form.Control type="password" {...formik.getFieldProps("confirmation_password")} />

                            {formik.touched.confirmation_password && formik.errors.confirmation_password && (
                                <span className="text-danger fw-semibold">{formik.errors.confirmation_password}</span>
                            )}
                        </Form.Group>
                        
                        <div className="mb-4">
                            <Link to="/" className="text-dark fw-semibold">Login</Link>
                        </div>

                        <div className="d-flex justify-content-center">
                            <Button type="submit" className="bg-dark" disabled={formik.isValid}>Cadastrar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}