import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from 'react-toastify';

export const AuthUser = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { findUser, errors: loginErrors = [], clearErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.forEach(error => {
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
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loginErrors, clearErrors]);

    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const onSubmit = handleSubmit(async (data) => {
        const success = await findUser(data);
        if (success) {
            toast.success('Usuario encontrado, puede continuar con el proceso', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const timer = setTimeout(() => {
                navigate(`/question/${success._id}`);
            }, 3000);
            return () => clearTimeout(timer);
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Verificación</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="username" className="form-label text-custom">Nombre de usuario</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="username" type="text" className="form-control" {...register("username", { required: true })} placeholder='Ingresa tu nombre de usuario' />
                        </div>
                        {errors.username && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600 }}>Este campo es obligatorio.</div>}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom text-white" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-custom-cancel text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthUser