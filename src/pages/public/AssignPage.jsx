import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom"; // Importa useParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { toast } from 'react-toastify';

export const AssignPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const { updateDevice } = useProducts();
    const navigate = useNavigate();
    const { id } = useParams(); // Obtiene el ID del producto desde la URL

    const onSubmit = handleSubmit(async () => {
        if (user) {
            const updateSuccess = await updateDevice(id, user._id);
    
            if (updateSuccess) {
                toast.success(`¡Dispositivo asignado correctamente!`, { autoClose: 3000 });
                navigate('/home');  
            } else {
                toast.error('Error al asignar el dispositivo', { autoClose: 3000 });
            }
        } else {
            toast.error('Usuario no encontrado', { autoClose: 3000 });
        }
    });
    

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Compra de dispensador</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="username" className="form-label text-custom">Asigna un nombre al dispositivo</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="username" type="text" className="form-control" {...register("username", { required: true })} placeholder='Ingresa un nombre que gustes para tu dispensador' />
                        </div>
                        {errors.username && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600 }}>Este campo es obligatorio.</div>}
                    </div>

                    {/* Se eliminó el input de ID del producto */}

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom text-white" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-custom-cancel text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssignPage;
