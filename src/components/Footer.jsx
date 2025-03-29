import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faMapMarkerAlt, faInfoCircle, faShieldAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from "react";
import { useCompany } from "../context/CompanyContext";
import { Link } from 'react-router-dom';

export function Footer() {
    const { getCompany, companys } = useCompany();

    useEffect(() => {
        getCompany();
    }, []);

    const telefono = companys && companys[0] ? companys[0].telefono : "";
    const redes = companys && companys[0] ? companys[0].redes_sociales : {};

    return (
        <footer className="footer container-fluid py-4">
            <div className="row text-center text-md-start">
                
                {/* Sobre Nosotros */}
                <div className="col-md-3 footer-section">
                    <h3><FontAwesomeIcon icon={faInfoCircle} /> Sobre Nosotros</h3>
                    <Link className="link-blanco" to="/mission">Misión de la empresa</Link> <br />
                    <Link className="link-blanco" to="/vision">Visión de la empresa</Link>
                </div>

                {/* Contacto */}
                <div className="col-md-3 footer-section">
                    <h3><FontAwesomeIcon icon={faPhone} /> Contáctanos</h3>
                    <Link className="link-blanco" to="/contact">
                        <FontAwesomeIcon icon={faEnvelope} /> Formulario de contacto
                    </Link> 
                    <br />
                    <p className="link-blanco"><FontAwesomeIcon icon={faPhone} /> +52 {telefono}</p> 
                </div>

                {/* Políticas */}
                <div className="col-md-3 footer-section">
                    <h3><FontAwesomeIcon icon={faShieldAlt} /> Políticas</h3>
                    <Link className="link-blanco" to="/policies">Políticas</Link> <br />
                    <Link className="link-blanco" to="/faqs">Preguntas frecuentes</Link> 
                </div>

                {/* Ubicación */}
                <div className="col-md-3 footer-section">
                    <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Ubicación</h3>
                    <Link className="link-blanco" to="/location">Ubicación de la empresa</Link> 
                </div>
            </div>

            {/* Redes Sociales */}
            <div className="text-center mt-4 footer-section">
                <h3>Redes Sociales</h3>
                <div className="social-icons d-flex justify-content-center gap-3">
                    {redes.facebook && (
                        <a href={redes.facebook} className="link-blanco" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                            <p>Facebook</p>
                        </a>
                    )}
                    {redes.twitter && (
                        <a href={redes.twitter} className="link-blanco" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                            <p>Twitter</p>
                        </a>
                    )}
                    {redes.instagram && (
                        <a href={redes.instagram} className="link-blanco" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                            <p>Instagram</p>
                        </a>
                    )}
                </div>
            </div>

            {/* Derechos reservados */}
            <div className="text-center mt-4">
                <p className="footer-copy">&copy; 2025 Huellitas Shop. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
