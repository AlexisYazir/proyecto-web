import { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const HistoryPage = () => {
    const { getHistory } = useProducts(); 
    const { mac } = useParams(); 
    const [historial, setHistorial] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchHistory = async () => {
            if (mac) {
                const data = await getHistory(mac); // Llamar a la API
                setHistorial(data || []); // Guardar el historial en el estado
            }
        };
        fetchHistory();
    }, [mac]); 

    const offset = currentPage * itemsPerPage;
    const currentHistory = historial.slice(offset, offset + itemsPerPage);

    // Cambiar de página
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container">
            <h2 className="card-title text-center">Historial del dispositivo ({mac})</h2>
            {historial.length === 0 ? (
                <h2 className="card-text text-center mt-4">Cargando historial...</h2>
            ) : (
                <div>
                    {currentHistory.map((item, index) => (
                        <div className="card-iot mt-4 mb-4 p-4" key={index}>
                            <strong>Fecha:</strong> {new Date(item.fecha).toLocaleString()} <br />
                            <strong>Estado Agua:</strong> {item.estado_agua} <br />
                            <strong>Estado Comida:</strong> {item.estado_comida} <br />
                            <strong>Traste Agua:</strong> {item.traste_agua} <br />
                            <strong>Traste Comida:</strong> {item.traste_comida} <br />
                            <strong>Bomba:</strong> {item.bomba} <br />
                            <strong>Servo:</strong> {item.servo} <br />
                        </div>
                    ))}

                    {/* Paginación */}
                    <ReactPaginate
                        pageCount={Math.ceil(historial.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName="pagination justify-content-center mt-3"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        activeClassName="active"
                        activeLinkClassName="bg-primary text-white"
                        nextLabel={">"}
                        previousLabel={"<"}
                    />
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
