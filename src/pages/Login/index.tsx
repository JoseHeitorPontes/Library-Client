import { useFormik } from "formik";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { api } from "../../services/api";
import { useSwal } from "../../hooks/useSwal";
import { initialValuesLogin } from "../../utils/initialValues/login";
import { loginSchema } from "../../utils/validations/loginSchema";

export function Login()
{
    const { Toast } = useSwal();

    const formik = useFormik({
        initialValues: initialValuesLogin,
        validationSchema: loginSchema,
        async onSubmit(values) {
            try {
                const { data } =  await api.post("/auth", values);

                localStorage.setItem("token", `Bearer ${data.token}`);

                location.href = "/dashboard";
            } catch(error: any) {
                console.log(error);

                const [firstMessage] = Object.values<string>(error.response.data.errors);

                Toast.fire({
                    icon: "error",
                    text: firstMessage,
                });
            }
        }
    });

    return (
        <div className="h-vh-full d-flex justify-content-center align-items-center my-0">
            <Card className="col-4 p-4">
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center">Login</h1>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Email:</Form.Label>

                            <Form.Control type="email" {...formik.getFieldProps("email")} />

                            {formik.touched.email && formik.errors.email && (
                                <span className="text-danger fw-semibold">{formik.errors.email}</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="fw-bold">Senha:</Form.Label>

                            <Form.Control type="password" {...formik.getFieldProps("password")} />

                            {formik.touched.password && formik.errors.password && (
                                <span className="text-danger fw-semibold">{formik.errors.password}</span>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-between mb-4">
                            <Link to="/novo-usuario" className="text-dark fw-semibold">Novo usuário</Link>

                            <Link to="/recuperar-senha" className="text-dark fw-semibold">Esqueceu a senha?</Link>
                        </div>

                        <div className="d-flex justify-content-center">
                            <Button
                                variant="dark"
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                Entrar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}