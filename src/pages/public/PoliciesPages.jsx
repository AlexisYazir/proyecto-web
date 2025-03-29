import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faCookieBite,
    faLock,
    faHeadset,
    faUniversalAccess,
    faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useCompany } from "../../context/CompanyContext";

export const PoliciesPage = () => {
    const { getCompany, companys } = useCompany();

    useEffect(() => {
        getCompany();
    }, []);

    // Obtener todas las políticas desde la base de datos (suponiendo que las políticas están en `politicas`)
    const politicas = companys && companys[0] ? companys[0].politicas : [];
    //console.log(politicas);

    // Mapeo de políticas con sus respectivos iconos
    const policySections = [
        {
            key: "privacidad",
            title: "Política de Privacidad",
            icon: faShieldAlt,
        },
        {
            key: "cookies",
            title: "Política de Cookies",
            icon: faCookieBite,
        },
        {
            key: "seguridad",
            title: "Política de Seguridad",
            icon: faLock,
        },
        {
            key: "atencion_al_cliente",
            title: "Política de Atención al Cliente",
            icon: faHeadset,
        },
        {
            key: "accesibilidad",
            title: "Política de Accesibilidad",
            icon: faUniversalAccess,
        },
        {
            key: "responsabilidad_social",
            title: "Política de Responsabilidad Social",
            icon: faHandsHelping,
        },
    ];

    return (
        <div className="container mt-4">
            <h1 className="card-title mt-4 mb-4 text-center">Políticas</h1>
            {politicas && Object.keys(politicas).length > 0 ? (
                <div>
                    {policySections.map((section) => {
                        const policies = politicas[section.key]; // Obtener todas las políticas de esta categoría
                        return (
                            policies &&
                            policies.length > 0 && (
                                <div key={section.key} className="card-iot mt-4 mb-4 p-4">
                                    <h2 className="card-title d-flex align-items-center mt-4 mb-4">
                                        <FontAwesomeIcon icon={section.icon} className="me-2" />
                                        {section.title}
                                    </h2>
                                    <ul className="list-unstyled">
                                        {policies.map((policy, index) => (
                                            <li key={index} className="card-text">
                                                <strong>{policy[section.key]}: </strong>
                                                {policy.descripcion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        );
                    })}

                </div>
            ) : (
                <p className="text-center">No hay políticas disponibles en este momento.</p>
            )}
        </div>
    );
};

export default PoliciesPage;
