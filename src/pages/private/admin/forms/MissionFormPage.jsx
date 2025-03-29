import { useForm } from 'react-hook-form';
import { useCompany } from '../../../../context/CompanyContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const MissionFormPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const { updateMisionVision, errors: missionErrors = [], clearErrors, getCompany, companys } = useCompany();
    const name = companys && companys[0] ? companys[0].nombre : "";
    const mision = companys && companys[0] ? companys[0].mision : "";
    const vision = companys && companys[0] ? companys[0].vision : "";
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            if (name) {
                    setValue('companyName', name);
                    setValue('mision', mision);
                    setValue('vision', vision);
                    
            }
        }
        loadUser();
    }, [setValue]);

    useEffect(() => {
        getCompany();
    }, []);

    // Limpiar errores después de 4 segundos
    useEffect(() => {
        if (missionErrors.length > 0) {
            missionErrors.forEach(error => {
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
            const timer = setTimeout(() => {
                clearErrors();
            }, 4000);
            return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
        }
    }, [missionErrors, clearErrors]);

    // Limpiar errores cuando el usuario comienza a modificar los campos
    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const onSubmit = handleSubmit(async (values) => {
        const success = await updateMisionVision(values); // Intenta registrar al usuario
        if (success) {
            toast.success('Datos actualizados exitosamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/catalog-vision');
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Actualizar Misión o Visión</h2>
                {missionErrors.length > 0 && missionErrors.map((error, i) => (
                    <div
                        className="alert mb-3"
                        key={i}
                        style={{ backgroundColor: "#f8d7da", color: "#c23616" }}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    <div className="mb-3 position-relative">
                        <div className="input-group">
                            <input id="companyName" type="hidden" className="form-control"  {...register("companyName")}  />
                        </div>
                    </div>
                    {/* Input mision */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="mision" className="form-label text-custom">Misión</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <textarea rows={10}  id="mision" type="text" className="form-control" {...register("mision", { required: true })} placeholder='Ingresa misión de la empresa' />
                        </div>
                        {errors.mision && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input vision */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="vision" className="form-label text-custom">Visión</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <textarea rows={10} id="vision"  type="text" className="form-control" {...register("vision", { required: true })} placeholder='Ingresa visión de la empresa' />
                        </div>
                        {errors.vision && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                        <Link to="/catalog-vision" className="btn btn-custom text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MissionFormPage;