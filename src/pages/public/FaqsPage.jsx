import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useCompany } from "../../context/CompanyContext";
import { useEffect, useState } from "react";

export const FaqsPage = () => {
    const { getFaqs } = useCompany();
    const [faqs, setFaqs] = useState([]); // Estado para almacenar las FAQs
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await getFaqs();
                setFaqs(res);
            } catch (error) {
                console.error("Error al obtener las preguntas frecuentes:", error);
                setError("No se pudieron cargar las preguntas frecuentes. Intenta nuevamente más tarde.");
            } finally {
                setLoading(false); // Se ejecuta siempre, haya error o no
            }
        };
        fetchFaqs();
    }, []);

    return (
        <div className="container">
            <h1 className="card-title mt-4 mb-4 text-center">Preguntas Frecuentes</h1>

            {loading ? ( // Muestra mensaje de carga mientras se obtienen los datos
                <p>Cargando preguntas frecuentes...</p>
            ) : error ? ( // Si hay error, muestra el mensaje correspondiente
                <p style={{ color: "red" }}>{error}</p>
            ) : faqs.length === 0 ? ( // Si la lista está vacía
                <p>No hay preguntas frecuentes disponibles.</p>
            ) : ( // Si todo está bien, muestra la lista de FAQs
                <ul>
                    {faqs.map((faq) => (
                        <div key={faq.id} className="card-iot mt-4 mb-4 p-4">
                            <h2 className="card-title d-flex align-items-center mt-4 mb-4">
                                <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                {faq.pregunta}</h2>
                            <p className="card-text">{faq.respuesta}</p>
                        </div>
                        
                    ))}
                </ul>
                
            )}
        </div>
    );
};

export default FaqsPage;
