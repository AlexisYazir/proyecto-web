import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useProducts } from '../../context/ProductsContext';

export const ViewDetails = () => {
    const { id } = useParams(); // Obtén el id del producto desde la URL
    const { getDetails, productDetails } = useProducts();
    const [selectedImage, setSelectedImage] = useState(0); // Estado para manejar la imagen seleccionada
    const navigate = useNavigate(); // Hook para navegar programáticamente

    // Llama a getDetails cuando el componente se monte
    useEffect(() => {
        getDetails(id);
    }, [id]);

    if (!productDetails) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className='card-title'>{productDetails.nombre_producto}</h1>
                    <button className="close-button" onClick={() => navigate(-1)}>×</button> {/* Retrocede en el historial */}
                </div>
                <div className="modal-body">
                    <div className="image-section">
                        <div className="main-image-container">
                            <img 
                                className="main-image" 
                                src={productDetails.imagenes[selectedImage]} 
                                alt={productDetails.nombre_producto} 
                            />
                        </div>
                        <div className="thumbnail-container">
                            {productDetails.imagenes.map((img, index) => (
                                <img 
                                    key={index} 
                                    className={`thumbnail ${selectedImage === index ? 'selected' : ''}`} 
                                    src={img} 
                                    alt={`Thumbnail ${index}`} 
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="details-section">
                        <p><strong>Descripción:</strong> {productDetails.descripcion}</p>
                        <p><strong>Marca:</strong> {productDetails.marca}</p>
                        <p><strong>Categoria:</strong> {productDetails.categoria}</p>
                        <p><strong>Precio:</strong> ${productDetails.precio}</p>
                        <p><strong>Existencias:</strong> {productDetails.stock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;