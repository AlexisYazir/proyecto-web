import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductsContext";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DevicesPage = () => {
    const { user } = useAuth();
    const { getDevicesUser } = useProducts();
    const [devices, setDevices] = useState([]); // Estado para almacenar los dispositivos

    useEffect(() => {
        if (user?._id) {
            const fetchDevices = async () => {
                try {
                    const res = await getDevicesUser(user._id);

                    if (res && res.length > 0) {
                        setDevices(res); // Si hay dispositivos, los guarda
                    } else if (res?.message) {
                        // Si la respuesta tiene un mensaje de error
                        setDevices([]); // Asegura que el estado de dispositivos esté vacío
                        console.log(res.message); // Mostrar el mensaje de error
                    }
                } catch (error) {
                    console.error("Error al obtener los dispositivos:", error);
                    setDevices([]); // Asegura que el estado se actualice con un array vacío en caso de error
                }
            };
            fetchDevices();
        }
    }, [user?._id]);


    return (
        <Container className="mt-4">
            <h2 className="card-title text-center">Dispositivos</h2>

            <Row className="justify-content-center">
                {devices.length > 0 ? (
                    devices.map((device) => (
                        <Col key={device._id} xs={12} sm={6} lg={4} className="mb-4 mt-4">
                            <div className="card-iot">
                                <div className="content-iot">
                                    <div className="text-center mb-4">
                                        <h2 className="card-title mb-4">{device?.nombre || "Desconocido"}</h2>
                                    </div>


                                    <p><strong>Mac:</strong> {device?.mac || "Desconocido"}</p>

                                    <Link to={`/control/${device._id}`} className="btn btn-custom-cancel text-white">
                                        Gestionar
                                    </Link>
                                    <Link to={`/history/${device.mac}`} className="btn btn-custom mt-2 text-white">
                                        Ver Historial
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <h3 className="text-center">No hay dispositivos registrados</h3>
                )}
            </Row>
        </Container>
    );
};

export default DevicesPage;
