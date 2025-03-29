import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faCalendar, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../../context/ProductsContext";
import { useAuth } from "../../../context/AuthContext";

export const DashboardAdminPage = () => {
    const { getProducts, products } = useProducts();
    const { getUsers, users, user } = useAuth();
    const [fechaActual, setFechaActual] = useState("");
    const username = user?.username || "";
    const imagen = user?.imagen || "";

    useEffect(() => {
        getProducts();
        getUsers();

        // Obtener la fecha actual
        const fecha = new Date();
        const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        setFechaActual(fecha.toLocaleDateString("es-ES", opciones));
    }, []);

    return (
        <div className="container mb-4 mt-4">
            <div className="admin-banner p-4 p-md-5">
                <div className="row align-items-center">
                    <div className="col-md-9">
                        <h1 className="card-title">
                            Bienvenido de nuevo, <span className="uppercase">{username.toUpperCase()}</span>
                        </h1>
                        <p className="card-subtitle mb-3">Panel de administración</p>

                        <p className="mb-3">
                            <FontAwesomeIcon icon={faCalendar} className="me-2" />
                            {fechaActual}
                        </p>
                    </div>

                    <div className="col-md-3 text-center d-none d-md-block">
                        <img src={imagen} alt="Foto de perfil" className="image-preview mb-3"
                            style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className="admin-stats mt-4">
                    <div className="row text-center g-3">
                        <div className="col-6 col-md-3">
                            <h1 className="card-title">
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                {users.length}
                            </h1>
                            <h1 className="card-title">Usuarios</h1>
                        </div>
                        <div className="col-6 col-md-3">
                            <h1 className="card-title">
                                <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                                {products.length}
                            </h1>
                            <h1 className="card-title">Productos</h1>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/catalog-products/" className="btn btn-warning text-white btn-admin">
                            <FontAwesomeIcon icon={faEye} className="me-2" />
                            Ver Productos
                        </Link>
                        <Link to="/add-product/" className="btn btn-primary text-white btn-admin">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Nuevo Producto
                        </Link>
                        <Link to="/catalog-users/" className="btn btn-success text-white btn-admin">
                            <FontAwesomeIcon icon={faEye} className="me-2" />
                            Ver Usuarios
                        </Link>
                        <Link to="/add-users/" className="btn btn-danger text-white btn-admin">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Nuevo Usuario
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdminPage;
