import { createContext, useContext, useState } from "react";
import { getProductsRequest, getProductRequest,getHistoryRequest,getDeviceInfoRequest,getDevicesByUsersRequest, getViewDetails,getDeviceByUserRequest,updateDeviceRequest, updateProductRequest, createProductRequest, deleteProductRequest, getMarcasRequest, getCategoriasRequest } from "../api/products";
import PropTypes from 'prop-types';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('Error: useProducts must be used within a ProductProvider');
    }
    return context;
};


export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [errors, setErrors] = useState([]);

    const createProduct = async (productData) => {
        try {
            await createProductRequest(productData);
            await getProducts(); // Se llama a getProducts() para actualizar la lista después de crear
            setErrors([]); // Limpiar errores en caso de éxito
            return true;
        } catch (error) {
            setErrors(error.response.data);
            // console.error("Error al crear el producto:", error);
            return false;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id)
            if (res.status === 204) setProducts(products.filter(producto => producto._id !== id))
        } catch (error) {
            console.log(error);
        }

    };

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getDevicesUser = async (usuario) => {
        try {
            const res = await getDeviceByUserRequest(usuario);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

    const getHistory = async (mac) => {
        try {
            const res = await getHistoryRequest(mac);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

    const getDeviceInfo = async (id) => {
        try {
            const res = await getDeviceInfoRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener la información del dispositivo:", error);
            return null; // Retornar null para indicar que hubo un problema
        }
    };

    const getDevicesByUsers = async () => {
        try {
            const res = await getDevicesByUsersRequest();
            return res.data;
        } catch (error) {
            console.error("Error al obtener la información de los dispositivos:", error);
            return null; // Retornar null para indicar que hubo un problema
        }
    };   

    const updateProduct = async (id, product) => {
        try {
            await updateProductRequest(id, product)
            return true;
        } catch (error) {
            setErrors(error.response.data);
            // console.error("Error al crear el producto:", error);
            return false;
        }
    }

    const updateDevice = async (id, usuario) => {
        try {
            await updateDeviceRequest(id, usuario)
            return true;
        } catch (error) {
            setErrors(error.response.data);
            // console.error("Error al asignar iot:", error);
            return false;
        }
    }

    const [marcas, setMarcas] = useState([]);

    const getMarcas = async () => {
        try {
            const res = await getMarcasRequest();
            setMarcas(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
            return [];
        }
    };

    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        try {
            const res = await getCategoriasRequest();
            setCategorias(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
            return [];
        }
    };
    const getDetails = async (id) => { // Recibe el id del producto
        try {
            const res = await getViewDetails(id); // Pasa el id a la API
            setProductDetails(res.data); // Almacena los detalles del producto
        } catch (error) {
            console.log(error);
        }
    };

    //para traer los datos al form de actualizar producto
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <ProductContext.Provider value={{ errors,getDevicesUser,getHistory,getDevicesByUsers,getDeviceInfo, updateDevice, getProduct, updateProduct, clearErrors, deleteProduct, getProducts, products, getDetails, productDetails, createProduct, getCategorias, categorias, getMarcas, marcas }}>
            {children}
        </ProductContext.Provider>
    );
}
ProductProvider.propTypes = {
    children: PropTypes.node, // `node` acepta cualquier cosa que pueda ser renderizada en React
};