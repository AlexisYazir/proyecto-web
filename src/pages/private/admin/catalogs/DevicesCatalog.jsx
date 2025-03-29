import { useEffect, useState } from "react";
import { useProducts } from "../../../../context/ProductsContext";

export const DevicesCatalog = () => {
  const { getDevicesByUsers } = useProducts(); // Asegúrate de que el nombre de la función sea correcto
  const [usersWithDevices, setUsersWithDevices] = useState([]); // Estado para almacenar los usuarios con dispositivos

  // Efecto para obtener los datos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDevicesByUsers(); // Llama a la función del contexto
        setUsersWithDevices(data); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios con dispositivos:", error);
      }
    };

    fetchData();
  }, [getDevicesByUsers]); // Dependencia: getDevicesByUsers

  return (
    <div className="container mt-4">
      <h1 className="card-title text-center">Catálogo de dispositivos</h1>
      {usersWithDevices.length === 0 ? (
        <p className="card-title text-center">No hay usuarios con dispositivos registrados.</p>
      ) : (
        usersWithDevices.map((user) => (
          <div className="card-iot mt-4 mb-4 p-4" key={user.id_usuario}>
            <h2 className="card-title">
              Usuario: {user.username ? user.username : "No asignado"}
            </h2>
            <h3 className="product-card-price">Dispositivos:</h3>
            <ul>
              {user.dispositivos.map((dispositivo) => (
                <p key={dispositivo.id_dispositivo}>
                  <strong className="card-text">Mac:</strong> {dispositivo.mac} <br />
                  <strong>Producto:</strong> {dispositivo.nombre_producto}
                </p>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default DevicesCatalog;
