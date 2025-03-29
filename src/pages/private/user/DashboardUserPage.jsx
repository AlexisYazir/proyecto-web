import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUserCircle, faEye, faCogs   } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

export const DashboardUserPage = () => {
    const { user } = useAuth();
    const [fechaActual, setFechaActual] = useState("");
    const username = user?.username || "";
    const imagen = user?.imagen || "";
    const id = user?._id || "";

    useEffect(() => {
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
                            Hola, <span className="uppercase">{username.toUpperCase()}</span>
                        </h1>
                        <p className="card-subtitle mb-3">Tu Panel de Usuario</p>

                        <p className="mb-3">
                            <FontAwesomeIcon icon={faCalendar} className="me-2" />
                            {fechaActual}
                        </p>
                    </div>

                    <div className="col-md-3 text-center d-none d-md-block">
                        <img
                            src={imagen}
                            alt="Foto de perfil"
                            className="image-preview mb-3"
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/catalog/" className="btn btn-warning text-white btn-user">
                            <FontAwesomeIcon icon={faEye} className="me-2" />
                            Ver Productos
                        </Link>
                        <Link to="/profile-u/" className="btn btn-primary text-white btn-user">
                            <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                            Ver Perfil
                        </Link>
                        {/* <Link to="/control/" className="btn btn-success text-white btn-user">
                            <FontAwesomeIcon icon={faCogs} className="me-2" />
                            Gestionar Iot
                        </Link> */}
                        <Link to={`/devices/${id}`} className="btn btn-danger text-white btn-user">
                            <FontAwesomeIcon icon={faCogs} className="me-2" />
                            Ver Dispositivos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUserPage;
