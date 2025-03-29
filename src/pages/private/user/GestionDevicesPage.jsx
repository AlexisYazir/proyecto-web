import { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../context/AuthContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

export const GestionDevicesPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { getProducts, products } = useProducts();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 4;

    useEffect(() => {
        getProducts();
    }, []);

    // Filtrar solo productos de la categoría "iot"
    const filteredProducts = products.filter(product =>
        product.stock > 0 &&
        (product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.marca.toLowerCase().includes(searchTerm.toLowerCase())) &&
        product.categoria.toLowerCase() === "iot" // Solo productos "iot"
    );

    const offset = currentPage * itemsPerPage;
    const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleBuyClick = (productId) => {
        if (!user) {
            toast.info("Debes iniciar sesión para comprar.");
            navigate("/login");
        } else {
            navigate(`/assign/${productId}`);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center card-title">Dispositivos IoT Disponibles</h1>

            {/* Barra de búsqueda */}
            <div className="input-group mb-3">
                <span className="input-group-text span">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center">No hay productos disponibles en la categoría IoT</p>
            ) : (
                <div>
                    <div className="row">
                        {currentProducts.map((product) => (
                            <div key={product._id} className="col-12 col-md-6 col-lg-3 mb-4">
                                <div className="card product-card">
                                    <div className="card-body">
                                        <img className="product-image" src={product.imagenes[0]} alt={product.nombre_producto} />
                                        <div className="product-info"> <br />
                                            <h5 className="product-card-price">{product.nombre_producto}</h5>
                                            <p className="product-card-text"><strong>Marca:</strong> {product.marca}</p>
                                            <p className="product-card-price"><strong>Precio:</strong> ${product.precio}</p>
                                        </div>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/view-details/${product._id}`} className="btn btn-custom-cancel mt-2 text-white">Ver</Link>
                                            <button onClick={() => handleBuyClick(product._id)} className="btn btn-custom mt-2 text-white">
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación con productos filtrados */}
                    <ReactPaginate
                        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName="pagination justify-content-center mb-2"
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

export default GestionDevicesPage;
