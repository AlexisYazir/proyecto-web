import { useProducts } from '../context/ProductsContext';
import { useEffect } from 'react';

const useProduct = () => {
    const {  getMarcas, getCategorias } = useProducts();
        useEffect(() => {
            getMarcas();
            getCategorias();
        }, []);
}

export default useProduct