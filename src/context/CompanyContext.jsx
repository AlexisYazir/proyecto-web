import { createContext, useContext, useState } from "react";
import { updateMisionVisionRequest, getCompanyRequest, addPolicieRequest, getFaqsRequest } from "../api/company";
import PropTypes from 'prop-types';

const CompanyContext = createContext();

export const useCompany = () => {
    const context = useContext(CompanyContext);

    if (!context) {
        throw new Error('Error: useCompany must be used within a CompanyProvider');
    }
    return context;
};


export function CompanyProvider({ children }) {
    const [companys, setCompanys] = useState([]);
    const [errors, setErrors] = useState([]);

    const updateMisionVision = async (companyData) => {
        try {
            await updateMisionVisionRequest(companyData);
            //await getProducts(); // Se llama a getProducts() para actualizar la lista después de crear
            setErrors([]); // Limpiar errores en caso de éxito
            return true;
        } catch (error) {
            setErrors([error.response.data]);
            console.error("Error al crear el producto:", error);
            return false;
        }
    };

    const addPolicie = async (data) => {
        try {
            await addPolicieRequest(data);
            //await getProducts(); // Se llama a getProducts() para actualizar la lista después de crear
            await getCompany();
            setErrors([]); // Limpiar errores en caso de éxito
            return true;
        } catch (error) {
            setErrors([error.response.data]);
            console.error("Error al agregar la politica crack:", error);
            return false;
        }
    };

    const getCompany = async () => {
        try {
            const res = await getCompanyRequest();
            setCompanys(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getFaqs = async () => {
        try {
            const res = await getFaqsRequest();
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <CompanyContext.Provider value={{ errors, getFaqs,clearErrors, updateMisionVision,companys, getCompany, addPolicie }}>
            {children}
        </CompanyContext.Provider>
    );
}

CompanyProvider.propTypes = {
    children: PropTypes.node, // `node` acepta cualquier cosa que pueda ser renderizada en React
};