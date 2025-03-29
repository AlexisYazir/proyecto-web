import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar as BootstrapNavbar, Nav, Button, Container, Offcanvas, NavDropdown } from "react-bootstrap";

export function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const username = user?.username || "";
    const userRole = user?.rol || "";
    const id = user?._id || "";
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <BootstrapNavbar expand="lg"
            style={{
                backgroundColor: "#ff6600", padding: "10px 20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
            <Container fluid>
                <BootstrapNavbar.Brand>
                    {isAuthenticated ? (
                        <Link to={userRole === "Administrador" ? "/dashboard-admin" : "/dashboard-u"}
                            style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem" }}>
                            {userRole === "Administrador" ? "Dashboard Admin" : "Dashboard User"}
                            <img src="/logoPry.png" alt="Logo"
                                style={{
                                    width: "50px", height: "50px", marginLeft: "8px", marginRight: "8px"
                                }} />

                        </Link>
                    ) : (
                        <Link to="/home" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem" }}>
                            <img src="/logoPry.png" alt="Logo" style={{ width: "50px", height: "50px", marginRight: "8px" }} />
                            HIELLITAS SHOP
                        </Link>
                    )}
                </BootstrapNavbar.Brand>
                {/* pa pantallas pequeñas */}
                <Button
                    variant="outline-light"
                    onClick={handleShowOffcanvas}
                    className="d-lg-none"
                    aria-controls="offcanvasNavbar"
                >
                    ☰
                </Button>
                <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(10px)", color: "#fff" }}>
                    <Offcanvas.Header closeButton closeVariant="white" style={{ backgroundColor: "rgb(255, 102, 0)" }}>
                        <Offcanvas.Title>Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {isAuthenticated ? (
                                // PANTALLA PEQUEÑA
                                userRole === "Administrador" ? (
                                    <>
                                        <Nav.Link as={Link} to="/dashboard-admin" className="btn btn-custom text-white mb-2">Inicio</Nav.Link>
                                        <Nav.Link as={Link} to="/profile" className="btn btn-custom text-white mx-2">Perfil</Nav.Link>
                                        <h5 className="text-center">AGREGAR</h5>
                                        <Nav.Link as={Link} to="/add-product" className="btn btn-custom-cancel text-white mb-2">Productos</Nav.Link>
                                        <Nav.Link as={Link} to="/add-policies" className="btn btn-custom-cancel text-white mb-2">Politicas</Nav.Link>
                                        <Nav.Link as={Link} to="/add-mv" className="btn btn-custom-cancel text-white mb-2">Misión/Visión</Nav.Link>
                                        <Nav.Link as={Link} to="/add-users" className="btn btn-custom-cancel text-white mb-2">Usuarios</Nav.Link>
                                        <h5 className="text-center">LISTAR</h5>
                                        <Nav.Link as={Link} to="/catalog-products" className="btn btn-custom-cancel text-white mb-2">Productos</Nav.Link>
                                        <Nav.Link as={Link} to="/policies" className="btn btn-custom-cancel text-white mb-2">Politicas</Nav.Link>
                                        <Nav.Link as={Link} to="/catalog-mission" className="btn btn-custom-cancel text-white mb-2">Misión</Nav.Link>
                                        <Nav.Link as={Link} to="/catalog-vision" className="btn btn-custom-cancel text-white mb-2">Visión</Nav.Link>
                                        <Nav.Link as={Link} to="/catalog-users" className="btn btn-custom-cancel text-white mb-2">Usuarios</Nav.Link>
                                        <Nav.Link as={Link} to="/catalog-devices" className="btn btn-custom-cancel text-white mb-2">Dispositivos</Nav.Link>
                                        <Nav.Link onClick={handleLogout} className="btn btn-custom-exit text-white mb-2">Salir</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        {/* Usuarios  // PANTALLA PEQUEÑA*/}
                                        <Nav.Link as={Link} to="/dashboard-u" className="btn btn-custom text-white mb-2">Inicio</Nav.Link>
                                        <Nav.Link as={Link} to="/catalog" className="btn btn-custom text-white mb-2">Catálogo</Nav.Link>
                                        <Nav.Link as={Link} to="/agregar" className="btn btn-custom-cancel text-white mx-2">Agregar</Nav.Link>
                                        <Nav.Link as={Link} to={`/devices/${id}`} className="btn btn-custom-cancel text-white mx-2">Ver dispositivos</Nav.Link>
                                        <Nav.Link as={Link} to="/profile-u" className="btn btn-custom-cancel text-white mx-2">Perfil</Nav.Link>
                                        <Nav.Link onClick={handleLogout} className="btn btn-custom-exit text-white mb-2">Salir</Nav.Link>
                                    </>
                                )
                            ) : (
                                <>
                                    {/* Solo visitantes sin sesion // PANTALLA PEQUEÑA */}
                                    <Nav.Link as={Link} to="/home" className="btn btn-custom-cancel text-white mb-2">Inicio</Nav.Link>
                                    <Nav.Link as={Link} to="/catalog" className="btn btn-custom-cancel text-white mb-2">Catálogo</Nav.Link>
                                    <h5 className="text-center">EMPRESA</h5>
                                    <Nav.Link as={Link} to="/mission" className="btn btn-custom text-white mb-2">Misión</Nav.Link>
                                    <Nav.Link as={Link} to="/vision" className="btn btn-custom text-white mb-2">Visión</Nav.Link>
                                    <Nav.Link as={Link} to="/contact" className="btn btn-custom text-white mb-2">Contacto</Nav.Link>
                                    <Nav.Link as={Link} to="/location" className="btn btn-custom text-white mb-2">Ubicación</Nav.Link>
                                    <Nav.Link as={Link} to="/policies" className="btn btn-custom text-white mb-2">Politicas</Nav.Link>
                                    <Nav.Link as={Link} to="/faqs" className="btn btn-custom text-white mb-2">Politicas</Nav.Link>
                                    <div>{username}</div>
                                    <Nav.Link as={Link} to="/login" className="btn btn-custom-cancel text-white mb-2">Iniciar sesión</Nav.Link>
                                    <Nav.Link as={Link} to="/register" className="btn btn-custom-cancel text-white mb-2">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Menú para pantallas grandes */}
                <BootstrapNavbar.Collapse id="navbar-menu" className="justify-content-end">
                    <Nav>
                        {isAuthenticated ? (
                            userRole === "Administrador" ? (
                                <>
                                    {/* /PANTALLA GRANDE ADMINISTRADOR */}
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Productos</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/add-product" className="text-white">Agregar</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/catalog-products" className="text-white">Listar</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Politicas</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/add-policies" className="text-white">Agregar</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/policies" className="text-white">Listar</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Misión/Visión</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/add-mv" className="text-white">Agregar</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/catalog-vision" className="text-white">Listar</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Usuarios</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/add-users" className="text-white">Agregar</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/catalog-users" className="text-white">Listar</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Dispositivos</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/catalog-devices" className="text-white">Listar</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={Link} to="/profile" className="btn btn-custom-cancel text-white mx-2">Perfil</Nav.Link>
                                    <Nav.Link onClick={handleLogout} className="btn btn-custom-cancel text-white mx-2">Salir</Nav.Link>
                                </>
                            ) : (
                                <>
                                    {/* /PANTALLA GRANDE USUARIO*/}
                                    <Nav.Link as={Link} to="/dashboard-u" className="btn btn-custom text-white mx-2">Inicio</Nav.Link>
                                    <Nav.Link as={Link} to="/catalog" className="btn btn-custom text-white mx-2">Catálogo</Nav.Link>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Acerca de</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/mission" className="text-white">Misión</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/vision" className="text-white">Visión</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/contact" className="text-white">Contacto</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/location" className="text-white">Ubicación</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>Politicas</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to="/policies" className="text-white">Politicas</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/faqs" className="text-white">Preguntas frecuentes</NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={<span style={{ color: "white" }}>IoT</span>}
                                        id="gestion-dropdown"
                                        className="btn btn-custom text-white mx-2 nav-dropdown"
                                        onMouseEnter={(e) => e.stopPropagation()}
                                        show
                                    >
                                        <NavDropdown.Item as={Link} to={`/devices/${id}`} className="text-white">Dispositivos</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/agregar" className="text-white">Agregar</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={Link} to="/profile-u" className="btn btn-custom-cancel text-white mx-2">Perfil {username}</Nav.Link>
                                    <Nav.Link onClick={handleLogout} className="btn btn-custom-cancel text-white mx-2">Salir</Nav.Link>
                                </>
                            )
                        ) : (
                            <>
                                {/* /PANTALLA GRANDE VISITANTES SIN SESION*/}
                                <Nav.Link as={Link} to="/home" className="btn btn-custom text-white mx-2">Inicio</Nav.Link>
                                <Nav.Link as={Link} to="/catalog" className="btn btn-custom text-white mx-2">Catálogo</Nav.Link>
                                <NavDropdown
                                    title={<span style={{ color: "white" }}>Acerca de</span>}
                                    id="gestion-dropdown"
                                    className="btn btn-custom text-white mx-2 nav-dropdown"
                                    onMouseEnter={(e) => e.stopPropagation()}
                                    show
                                >
                                    <NavDropdown.Item as={Link} to="/mission" className="text-white">Misión</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/vision" className="text-white">Visión</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/contact" className="text-white">Contacto</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/location" className="text-white">Ubicación</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title={<span style={{ color: "white" }}>Politicas</span>}
                                    id="gestion-dropdown"
                                    className="btn btn-custom text-white mx-2 nav-dropdown"
                                    onMouseEnter={(e) => e.stopPropagation()}
                                    show
                                >
                                    <NavDropdown.Item as={Link} to="/policies" className="text-white">Politicas</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/faqs" className="text-white">Preguntas frecuentes</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/login" className="btn btn-custom-cancel text-white mx-2">Iniciar sesión</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="btn btn-custom-cancel text-white mx-2">Registro</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;
