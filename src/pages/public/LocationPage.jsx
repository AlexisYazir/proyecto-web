import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Importar los íconos de Leaflet (necesario para el marcador)
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar el ícono predeterminado de Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], // Tamaño del ícono
    iconAnchor: [12, 41], // Punto de anclaje del ícono
});

L.Marker.prototype.options.icon = DefaultIcon;

export const LocationPage = () => {
    // Coordenadas 
    const position = [21.1551465, -98.3821137]; // Latitud y longitud 

    return (
        <div className='container text-center'  style={{ backgroundColor: '#fff5eb', minHeight: '100vh', padding: '2rem' }}>
            {/* Título */}
            <h1 className='card-title mb-4'>Ubicación de la empresa</h1>

            {/* Contenedor del mapa */}
            <div style={styles.mapContainer}>
                <MapContainer center={position} zoom={15} style={styles.map}>
                    {/* Capa de OpenStreetMap */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Marcador en la ubicación especificada */}
                    <Marker position={position}>
                        <Popup>
                            ¡Huellitas Shop! <br /> Esta es la ubicación de la empresa.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <h5 className=' card-text mt-4'>Estamos ubicados en Parque de poblamiento. En Avenida Principal</h5>
        </div>
    );
};

const styles = {
    mapContainer: {
        height: '400px',
        borderRadius: '8px', 
        overflow: 'hidden',
    },
    map: {
        height: '100%',
        width: '100%',
    },
};

export default LocationPage;