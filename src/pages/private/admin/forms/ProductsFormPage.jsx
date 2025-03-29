import { useForm } from 'react-hook-form';
import { useProducts } from '../../../../context/ProductsContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faAlignLeft, faDatabase, faLink, faTags } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const ProductsFormPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const { createProduct, errors: productErrors = [], clearErrors, getMarcas, marcas, getCategorias, categorias, getProduct, getProducts, updateProduct } = useProducts();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getMarcas();
        getCategorias();
    }, []);

    const [title, setTitle] = useState("Registro de producto");
    const [subtitle, setSubtitle] = useState("Agrega un nuevo producto al catálogo");

    useEffect(() => {
        async function loadProduct() {
            if (params.id && marcas.length > 0 && categorias.length > 0) {
                const produ = await getProduct(params.id);
                if (produ) {
                    setValue('nombre_producto', produ.nombre_producto);
                    setValue('descripcion', produ.descripcion);
                    setValue('precio', produ.precio);
                    setValue('stock', produ.stock);
                    setValue('imagen1', produ.imagenes[0]);
                    setValue('imagen2', produ.imagenes[1]);
                    setValue('imagen3', produ.imagenes[2]);

                    setTitle("Actualizando Producto");
                    setSubtitle("Actualiza los datos de este producto");

                    // Buscar la marca en el array de marcas
                    const marcaEncontrada = marcas.find(m => m.marca === produ.marca);
                    if (marcaEncontrada) {
                        setValue('marca', marcaEncontrada.marca);
                    }

                    // Buscar la categoría en el array de categorías
                    const categoriaEncontrada = categorias.find(c => c.categoria === produ.categoria);
                    if (categoriaEncontrada) {
                        setValue('categoria', categoriaEncontrada.categoria);
                    }
                }
            } else {
                setTitle("Registro de producto");
                setSubtitle("Agrega un nuevo producto al catálogo");
            }
        }
        loadProduct();
    }, [params.id, marcas, categorias, setValue]);

    useEffect(() => {
        if (productErrors.length > 0) {
            productErrors.forEach(error => {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
            const timer = setTimeout(() => clearErrors(), 4000);
            return () => clearTimeout(timer);
        }
    }, [productErrors, clearErrors]);

    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const onSubmit = handleSubmit(async (values) => {
        if (params.id) {
            const success = await updateProduct(params.id, values);
            if (success) {
                toast.success('Producto actualizado exitosamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getProducts();
                navigate('/catalog-products');
            }
        } else {
            const success = await createProduct(values);
            if (success) {
                toast.success('¡Producto guardado exitosamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/catalog-products');
            }
        }
    });
    return (
        <div className="container" style={{ backgroundColor: '#fff5eb', minHeight: '100vh', padding: '2rem' }}>
            <div className="card-admin">
                <div className="row g-0">
                    <div className="col-md-12 p-4">
                        <h2 className="card-title mb-1 text-center" id='title'>{title}</h2>
                        <p className="subtitle-admin mb-4 text-center" id='subtitule'>{subtitle}</p>

                        <form className="row g-4" onSubmit={onSubmit}>
                            {/* Nombre del Producto */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="nombre_producto">Nombre del producto</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="nombre_producto" type="text" className="form-control form-control-admin" {...register("nombre_producto", { required: true })} placeholder="Ingresa el nombre del producto" />
                                </div>
                                {errors.nombre_producto && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>

                            {/* Descripción */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="descripcion">Descripción</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="descripcion" type="text" className="form-control form-control-admin" {...register("descripcion", { required: true })} placeholder="Ingresa una descripción" />
                                </div>
                                {errors.descripcion && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>

                            {/* Precio */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="precio">Precio</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faDollar} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="precio" type="number" className="form-control form-control-admin" {...register("precio", { required: true })} placeholder="Ingresa el precio del producto" />
                                </div>
                                {errors.precio && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>

                            {/* Stock */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="stock">Stock</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faDatabase} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="stock" type="number" className="form-control form-control-admin" {...register("stock", { required: true })} placeholder="Ingresa el stock del producto" />
                                </div>
                                {errors.stock && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>

                            {/* Marca */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="marca">Elige una marca</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faTags} style={{ color: '#db5802' }} />
                                    </span>
                                    <select id="marca" className="form-control" style={{ padding: '5px' }} {...register("marca", { required: true })}>
                                        <option value="">Selecciona una marca</option>
                                        {Array.isArray(marcas) && marcas.map((marca) => (
                                            <option key={marca._id} value={marca.marca}>{marca.marca}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.marca && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>

                            {/* Categoría */}
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="categoria">Elige una categoría</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faTags} style={{ color: '#db5802' }} />
                                    </span>
                                    <select id="categoria" className="form-control form-control-admin" style={{ padding: '5px' }}    {...register("categoria", { required: true })}>
                                        <option value="">Selecciona una categoría</option>
                                        {Array.isArray(categorias) && categorias.map((categoria) => (
                                            <option key={categoria._id} value={categoria.categoria}>{categoria.categoria}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.categoria && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                    Este campo es obligatorio.
                                </div>}
                            </div>
                            {/* Input url imagen*/}
                            <div className="col-md-6">
                                <label htmlFor="imagen1" className="form-label text-custom">URL de imagen 1</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLink} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="imagen1" type="text" className="form-control" {...register("imagen1", { required: true })} placeholder='Ingresa URL de imagen 1' />
                                </div>
                                {errors.imagen1 && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input url imagen*/}
                            <div className="col-md-6">
                                <label htmlFor="imagen2" className="form-label text-custom">URL de imagen 2</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLink} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="imagen2" type="text" className="form-control" {...register("imagen2", { required: true })} placeholder='Ingresa URL de imagen 2' />
                                </div>
                                {errors.imagen2 && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input url imagen*/}
                            <div className="mb-3 position-relative">
                                <label htmlFor="imagen3" className="form-label text-custom">URL de imagen 3</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLink} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="imagen3" type="text" className="form-control" {...register("imagen3", { required: true })} placeholder='Ingresa URL de imagen 3' />
                                </div>
                                {errors.imagen3 && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Botones */}
                            <div className="col-12 d-flex justify-content-center gap-2">
                                <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                                <Link to="/catalog-products" className="btn btn-custom text-white">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsFormPage;
