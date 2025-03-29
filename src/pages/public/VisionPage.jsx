import { useEffect } from "react";
import { useCompany } from "../../context/CompanyContext";

export const VisionPage = () => {
        const { getCompany, companys } = useCompany();
    
        useEffect(() => {
            getCompany();
        }, []);
    
        const vision = companys && companys[0] ? companys[0].vision : "";
    return (
        <div>
            <h1 className="card-title text-center mt-4 mb-4">Visión de la empresa</h1>
            <div className="d-flex flex-column flex-md-row align-items-center">
                <h5 className="card-text" style={{padding:"20px", flex: 1}}> 
                    {vision}
                </h5> 
                <img src="/img-baner.webp" alt="" className="img-fluid mb-3 mb-md-0" 
                    style={{ padding: "20px", maxWidth: "100%", width: "30%", minWidth: "200px" }}
                />
            </div>
        </div>
    )
}

export default VisionPage;
