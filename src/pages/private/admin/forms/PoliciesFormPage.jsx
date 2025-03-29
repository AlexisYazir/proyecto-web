import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useCompany } from "../../../../context/CompanyContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const PoliciesFormPage = () => {
    const { getCompany, companys, addPolicie } = useCompany();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [politicas, setPoliticas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCompany();
    }, []);

    // Actualizar políticas cuando `companys` cambie
    useEffect(() => {
        if (companys && companys[0]?.politicas) {
            setPoliticas(Object.keys(companys[0].politicas));
        }
        if (companys && companys[0]?.nombre) {
            setValue("companyName", companys[0].nombre); // Asegurar que el nombre de la empresa se registre
        }
    }, [companys, setValue]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            // Estructura de datos para la API
            const newPolicy = {
                companyName: values.companyName,
                policyType: values.policyType,
                policyName: values.policyName,
                descripcion: values.descripcion,
            };

            const success = await addPolicie(newPolicy);
            if (success) {
                toast.success('¡La politica se guardo correctamente!', { autoClose: 3000 });
                setTimeout(() => navigate('/policies'), 3000);
            }
        } catch (error) {
            toast.error("Error al registrar la política.");
            console.error(error);
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Registro de Políticas</h2>

                <form onSubmit={onSubmit}>
                    {/* Campo oculto para el nombre de la empresa */}
                    <input type="hidden" {...register("companyName")} />

                    {/* Selector de categoría de política */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="policyType" className="form-label text-custom">Elige una categoría de política</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faCookieBite} style={{ color: '#db5802' }} />
                            </span>
                            <select id="policyType" className="form-control form-control-admin" {...register("policyType", { required: true })} style={{ padding: '5px' }}>
                                <option value="">Selecciona una categoría de política</option>
                                {politicas.map((politica, index) => (
                                    <option key={index} value={politica}>{politica}</option>
                                ))}
                            </select>
                        </div>
                        {errors.policyType && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}> Este campo es obligatorio. </div>}
                    </div>

                    {/* Nombre de la política */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="policyName" className="form-label text-custom">Nombre de política</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="policyName" type="text" className="form-control" {...register("policyName", { required: true })} placeholder='Ingresa nombre de política' />
                        </div>
                        {errors.policyName && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}> Este campo es obligatorio. </div>}
                    </div>

                    {/* Descripción */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="descripcion" className="form-label text-custom">Descripción</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="descripcion" type="text" className="form-control" {...register("descripcion", { required: true })} placeholder='Ingresa la descripción' />
                        </div>
                        {errors.descripcion && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}> Este campo es obligatorio. </div>}
                    </div>

                    {/* Botones */}
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                        <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PoliciesFormPage;
