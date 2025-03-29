import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { signin, errors: loginErrors = [], clearErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
        const rol = await signin(data);
        if (rol) {
            if (rol === 'Administrador') {
                toast.success('Inicio de sesión exitoso! Bienvenido Administrador', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/dashboard-admin');

            } else if (rol === 'Usuario') {
                toast.success('Inicio de sesión exitoso! Bienvenido Usuario', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/dashboard-u');

            }
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>

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

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label text-custom">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                                    maxLength: { value: 16, message: "La contraseña debe tener un maximo de 16 caracteres" }
                                })}
                                placeholder="Ingresa tu contraseña"
                            />
                            <span className="input-group-text span" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                            </span>
                        </div>
                        {errors.password && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600 }}>{errors.password.message}</div>}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Ingresar</button>
                        <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                    </div>
                    <div className="mt-3 text-center">
                        <label htmlFor="email">
                            ¿No tienes una cuenta? <Link to="/register" className="link-naranja">Regístrate</Link> <br />
                            ¿Olvidaste tu contraseña? <Link to="/auth" className="link-naranja">Clic aqui</Link>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;