import { useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";
import { FaBookReader } from "react-icons/fa";

export function Sidebar()
{
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);

    return (
        <>
            <Navbar expand="lg" className="bg-green">
                <Container fluid>
                    <div className="d-flex align-items-center gap-2">
                        <Button className="bg-green btn-green" onClick={() => setShowSideBar(true)}>
                            <FaBars />
                        </Button>

                        <h3 className="mb-0 text-light">Biblioteca</h3>
                    </div>

                    <div className="d-flex align-items-center justify-content-between gap-4">
                        <span className="text-light">
                            <FaUserCircle /> José Heitor
                        </span>

                        <Button className="bg-green btn-green">
                            Sair <TbLogout />
                        </Button>
                    </div>
                </Container>
            </Navbar>

            <Offcanvas show={showSideBar} onHide={handleCloseSideBar}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-green">Biblioteca</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <nav className="d-flex flex-column gap-2">
                        <Row>
                            <Link to="/" className="d-flex align-items-center gap-2 text-green text-decoration-none">
                                <MdDashboard />
                                Dashboard
                            </Link>
                        </Row>

                        <Row>
                            <Link to="/categorias" className="d-flex align-items-center gap-2 text-green text-decoration-none">
                                <SiBookstack />
                                Categorias
                            </Link>
                        </Row>

                        <Row>
                            <Link to="/livros" className="d-flex align-items-center gap-2 text-green text-decoration-none">
                                <FaBook />
                                Livros
                            </Link>
                        </Row>

                        <Row>
                            <Link to="/emprestimos" className="d-flex align-items-center gap-2 text-green text-decoration-none">
                                <FaBookReader />
                                Livros
                            </Link>
                        </Row>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}