import { useFormik } from "formik";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { initialValuesLogin } from "../../utils/initialValues/login";
import { loginSchema } from "../../utils/validations/loginSchema";
import { api } from "../../services/api";

export function Login()
{
    const formik = useFormik({
        initialValues: initialValuesLogin,
        validationSchema: loginSchema,
        async onSubmit(values) {
            try {
                const { data } =  await api.post("/auth", values);

                localStorage.setItem("token", `Bearer ${data.token}`);
            } catch(error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="h-vh-full d-flex justify-content-center align-items-center bg-green my-0">
            <Card className="col-4 p-4">
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center">Login</h1>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Email:</Form.Label>

                            <Form.Control type="email" {...formik.getFieldProps("email")} />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Senha:</Form.Label>

                            <Form.Control type="password" {...formik.getFieldProps("password")} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="dark" type="submit">
                                Entrar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}