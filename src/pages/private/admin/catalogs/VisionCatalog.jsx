import { useEffect } from "react";
import { useCompany } from "../../../../context/CompanyContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export const VisionCatalog = () => {
    const { getCompany, companys } = useCompany();

    useEffect(() => {
        getCompany();
    }, []);

    const mision = companys && companys[0] ? companys[0].mision : "";
    const vision = companys && companys[0] ? companys[0].vision : "";
    return (
        <div className="container mt-4">
         <h1 className="card-title text-center mb-4">Catalogo de Misión y Visión</h1>
            <div className="card-iot mt-4 mb-4 p-4">
            <h1 className="card-title">Misión <Link to="/add-mv" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faEdit} /></Link> </h1>
            <p>{mision}</p>            
            </div>
            <div className="card-iot mt-4 mb-4 p-4">
            <h1 className="card-title">Visión <Link to="/add-mv" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faEdit} /></Link> </h1>
            <p>{vision}</p>

            </div>
   
        </div>
    );
}

export default VisionCatalog;