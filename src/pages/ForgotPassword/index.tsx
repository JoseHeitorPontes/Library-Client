import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export function ForgotPassword()
{
    return (
        <div className="h-vh-full d-flex justify-content-center align-items-center my-0">
            <Card className="col-4 py-4">
                <Card.Body>
                    <Form>
                        <h1 className="text-center">Recuperar senha</h1>

                        <p className="my-0 fw-semibold mb-2">Informe seu email para que seja enviado um link para redefinição de senha.</p>

                        <div className="mb-2">
                            <Link to="/" className="text-dark fw-semibold">Login</Link>
                        </div>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Email:</Form.Label>

                            <Form.Control type="email" />

                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="dark">Enviar email</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}