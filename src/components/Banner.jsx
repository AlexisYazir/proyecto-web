import { Link } from "react-router-dom";

export const Banner = () => {
    return (
        <div className="banner-pet d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
                        <h1 className="title-pet">
                            <i className="bi bi-paw-fill paw-icon"></i>
                            ¡Bienvenido a Huellitas Shop!
                        </h1>
                        <p className="subtitle-pet">
                            Todo lo que tus mascotas necesitan en un solo lugar.
                        </p>
                        <Link to="/catalog" className="btn btn-custom-pet">
                            Explorar Productos
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>
                    <div className="col-lg-6 text-center">
                        <img src="/img-baner.webp"
                            alt="Perrito feliz"
                            className="pet-image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;