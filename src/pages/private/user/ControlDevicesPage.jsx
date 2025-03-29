import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faWifi, faBowlFood, faBox, faClipboardList, faTint, faUtensils, faBolt, } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../../context/ProductsContext";
import { useEffect, useState, useRef } from "react";
import mqtt from 'mqtt';
import { toast } from 'react-toastify';

// Función para obtener la imagen basada en el estado
const getImageForState = (state, type) => {
    if (type === "agua") {
        switch (state) {
            case "LLENO":
                return "/traste-agua-lleno.png";
            case "MEDIO":
                return "/traste-agua-medio.png";
            case "VACIO":
                return "/traste-agua-vacio.png";
            default:
                return "/traste-agua-medio.png";
        }
    } else if (type === "comida") {
        switch (state) {
            case "LLENO":
                return "/traste-comida-lleno.png";
            case "MEDIO":
                return "/traste-comida-medio.png";
            case "VACIO":
                return "/traste-comida-vacio.png";
            default:
                return "/traste-comida-vacio.png";
        }
    } else if (type === "cont-comida") {
        switch (state) {
            case "LLENO":
                return "/comida-lleno.png";
            case "MEDIO":
                return "/comida-medio.png";
            case "VACIO":
                return "/traste-vacio.png";
            default:
                return "/traste-vacio.png";
        }
    } else if (type === "cont-agua") {
        switch (state) {
            case "LLENO":
                return "/agua-lleno.png";
            case "MEDIO":
                return "/agua-medio.png";
            case "VACIO":
                return "/traste-vacio.png";
            default:
                return "/traste-vacio.png";
        }
    }
};

const ControlDevicesPage = () => {
    const { getDeviceInfo } = useProducts();
    const { id } = useParams(); // Obtener el ID de la URL
    const [device, setDevice] = useState(null);

    // Estado para el cliente MQTT
    const [mqttStatus, setMqttStatus] = useState('Desconectado');
    const clientRef = useRef(null);
    const [servoStatus, setServoStatus] = useState('');
    const [bombaStatus, setBombaStatus] = useState('');

    // Configuración MQTT
    const MQTT_CONFIG = {
        url: 'wss://teaf165f.ala.dedicated.aws.emqxcloud.com:8084/mqtt',
        options: {
            username: 'yaziresp32',
            password: 'yaziresp32',
            clientId: `ReactClient_${Math.random().toString(16).substr(2, 8)}`
        }
    };

    // Conectar a MQTT
    useEffect(() => {
        // Crear cliente MQTT
        const client = mqtt.connect(MQTT_CONFIG.url, MQTT_CONFIG.options);
        clientRef.current = client;

        // Eventos de conexión
        client.on('connect', () => {
            console.log('Conectado a MQTT');
            setMqttStatus('Conectado');

            // Suscribirse a tópicos
            client.subscribe('dispositivo/servo/estado');
            client.subscribe('dispositivo/bomba/estado');
            client.subscribe('dispositivo/sensores');
        });

        // Recibir mensajes
        client.on('message', (topic, message) => {
            const msg = message.toString();
            console.log(`Mensaje recibido en ${topic}: ${msg}`);

            // Procesar mensajes según el tópico
            if (topic === 'dispositivo/servo/estado') {
                setServoStatus(msg);
            } else if (topic === 'dispositivo/bomba/estado') {
                setBombaStatus(msg);
            } else if (topic === 'dispositivo/sensores') {
                try {
                    const sensorData = JSON.parse(msg);
                    console.log('Datos de sensores recibidos:', sensorData);
                    // Aquí puedes actualizar el estado con los datos de los sensores
                    // Por ejemplo, si los datos incluyen información sobre niveles:
                    // updateDeviceData(sensorData);
                } catch (e) {
                    console.error('Error al parsear datos de sensores:', e);
                }
            }
        });

        client.on('error', (err) => {
            console.error('Error MQTT:', err);
            setMqttStatus(`Error: ${err.message}`);
        });

        // Limpiar al desmontar
        return () => {
            if (client) {
                client.end();
                console.log('Desconectado de MQTT');
            }
        };
    }, []);

    const dispensarComida = () => {
        if (device.traste_comida === "LLENO" || device.traste_comida === "MEDIO") {
            toast.info("No se puede dispensar comida. El traste aún tiene comida.");
            return;
        }
    
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish('dispositivo/servo', 'DISPENSAR');
            console.log('Comando enviado: Dispensar comida');
            toast.success("Dispensando comida");
        } else {
            console.error('No hay conexión MQTT para dispensar comida');
            alert('Error: Sin conexión al dispensador');
        }
    };
    
    const dispensarAgua = () => {
        if (device.traste_agua === "LLENO" || device.traste_agua === "MEDIO") {
            toast.info("No se puede dispensar agua. El traste aún tiene agua.");
            return;
        }
    
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish('dispositivo/bomba', 'ON');
            console.log('Comando enviado: Dispensar agua');
            toast.success("Dispensando agua");
    
            // Desactivar automáticamente después de 3 segundos
            setTimeout(() => {
                clientRef.current.publish('dispositivo/bomba', 'OFF');
                toast.success("Parando dispensado de agua");
                console.log('Comando enviado: Detener dispensación de agua');
            }, 25000);
        } else {
            console.error('No hay conexión MQTT para dispensar agua');
            alert('Error: Sin conexión al dispensador');
        }
    };
    

    // Obtener información del dispositivo del API
    useEffect(() => {
        if (id) {
            const fetchDevices = async () => {
                try {
                    const res = await getDeviceInfo(id);
                    setDevice(res); // Guardar los datos obtenidos
                } catch (error) {
                    console.error("Error al obtener los dispositivos:", error);
                }
            };

            fetchDevices(); // Primera ejecución inmediata

            // Intervalo para actualizar cada 5 segundos
            const interval = setInterval(fetchDevices, 2000);

            return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
        }
    }, [id, getDeviceInfo]);

    return (
        <Container className="card-iot mt-4 mb-4">
            <div className="card-header-iot d-flex justify-content-between align-items-center">
                <h1 className="card-title mb-0">
                    <FontAwesomeIcon icon={faRobot} className="me-2" /> Dispensador
                </h1>
                <span className="device-name">
                    <FontAwesomeIcon
                        icon={faWifi}
                        className={`me-2 ${mqttStatus === 'Conectado' ? 'text-success' : 'text-danger'}`}
                    />
                    {device?.mac} ({mqttStatus})
                </span>
            </div>

            <div className="content-iot">
                {device ? (
                    <>
                        <div className="section-title">
                            <FontAwesomeIcon icon={faClipboardList} className="me-2" /> Estado de Contenedores
                        </div>

                        <Row className="g-3">
                            <Col md={6}>
                                <div className="status-iot d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faBox} className="me-2" />
                                        <p className="section-title">Contenedor Agua</p>
                                        <p className="section-title">{device.estado_agua}</p>
                                    </div>
                                    <img src={getImageForState(device.estado_agua, "cont-agua")} alt="Estado agua" width={140} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="status-iot d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faBowlFood} className="me-2" />
                                        <p className="section-title">Contenedor Comida</p>
                                        <p className="section-title">{device.estado_comida}</p>
                                    </div>
                                    <img src={getImageForState(device.estado_comida, "cont-comida")} alt="Estado comida" width={140} />
                                </div>
                            </Col>
                        </Row>

                        <div className="section-title">
                            <FontAwesomeIcon icon={faClipboardList} className="me-2" /> Estado de Trastes
                        </div>

                        <Row className="g-3">
                            <Col md={6}>
                                <div className="status-iot warning d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faBowlFood} className="me-2" />
                                        <p className="section-title">Traste Agua</p>
                                        <p className="section-title">{device.traste_agua}</p>
                                    </div>
                                    <img src={getImageForState(device.traste_agua, "agua")} alt="Estado traste agua" width={120} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="status-iot warning d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faBowlFood} className="me-2" />
                                        <p className="section-title">Traste Comida</p>
                                        <p className="section-title">{device.traste_comida}</p>
                                    </div>
                                    <img src={getImageForState(device.traste_comida, "comida")} alt="Estado traste comida" width={120} />
                                </div>
                            </Col>
                        </Row>

                        <div className="section-title mt-4">
                            <FontAwesomeIcon icon={faBolt} className="me-2" /> Estados
                        </div>
                        <Row className="g-3">
                            <Col md={6}>
                                <div className="status-iot danger d-flex justify-content-center align-items-center">
                                    <div>
                                        <p className="section-title">Estado Dispensador de Agua</p>
                                        <p className="card-title text-center">{device.bomba === "ON" ? "ENCENDIDO" : "APAGADO"}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="status-iot danger d-flex justify-content-center align-items-center">
                                    <div>
                                        <p className="section-title">Estado Dispensador de comida</p>
                                        <p className="card-title text-center">{device.servo === "ON" ? "ENCENDIDO" : "APAGADO"}</p>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                        <div className="section-title mt-4">
                            <FontAwesomeIcon icon={faBolt} className="me-2" /> Acciones
                        </div>

                        <Row className="g-3">
                            <Col md={6}>
                                <Button
                                    className="btn-iot water w-100"
                                    onClick={dispensarAgua}
                                    disabled={mqttStatus !== 'Conectado'}
                                >
                                    <FontAwesomeIcon icon={faTint} className="me-2" />
                                    Dispensar Agua
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button
                                    className="btn-iot w-100"
                                    onClick={dispensarComida}
                                    disabled={mqttStatus !== 'Conectado'}
                                >
                                    <FontAwesomeIcon icon={faUtensils} className="me-2" />
                                    Dispensar Comida
                                </Button>
                            </Col>
                        </Row>

                    </>
                ) : (
                    <p className="text-center mt-4">Cargando datos del dispositivo...</p>
                )}
            </div>
        </Container>
    );
};

export default ControlDevicesPage;