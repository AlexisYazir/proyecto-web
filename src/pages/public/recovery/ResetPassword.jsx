import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { toast } from 'react-toastify';

export const ResetPassword = () => {
    const { username } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    
    // Estados para controlar si se ha comenzado a escribir en cada input
    const [password1Active, setPassword1Active] = useState(false);
    const [password2Active, setPassword2Active] = useState(false);

    // Para validar los criterios de contraseña
    const [passwordCriteria, setPasswordCriteria] = useState({
        hasUppercase: null,
        hasLowercase: null,
        hasNumber: null,
        hasSpecialChar: null,
        hasMinLength: null,
    });

    // Para validar los criterios de la confirmación de contraseña
    const [password2Criteria, setPassword2Criteria] = useState({
        hasUppercase: null,
        hasLowercase: null,
        hasNumber: null,
        hasSpecialChar: null,
        hasMinLength: null,
    });

    const validatePassword = (password, isPassword1 = true) => {
        // Si es la primera vez que se escribe, activar el estado correspondiente
        if (isPassword1 && !password1Active && password.length > 0) {
            setPassword1Active(true);
        } else if (!isPassword1 && !password2Active && password.length > 0) {
            setPassword2Active(true);
        }

        const criteria = {
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 8,
        };
        
        if (isPassword1) {
            setPasswordCriteria(criteria);
        } else {
            setPassword2Criteria(criteria);
        }
        
        return Object.values(criteria).every(value => value === true);
    };

    const onSubmit = async (data) => {
        try {
            // Verificar que las contraseñas coincidan
            if (data.password !== data.password2) {
                toast.error("Las contraseñas no coinciden.");
                return;
            }

            // Verificar que ambas contraseñas cumplen con los criterios
            const isPassword1Valid = validatePassword(data.password);
            const isPassword2Valid = validatePassword(data.password2, false);

            if (!isPassword1Valid || !isPassword2Valid) {
                toast.error("La contraseña no cumple con todos los requisitos.");
                return;
            }

            const response = await resetPassword({ 
                username, 
                password: data.password, 
                password2: data.password2 
            });
            
            if (response) {
                toast.success("Felicidades, se restableció su contraseña correctamente.");
                const timer = setTimeout(() => {
                    navigate('/login');
                }, 3000);
                return () => clearTimeout(timer);
            } else {
                toast.error("Contraseña inválida. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error verificando la contraseña:", error);
            toast.error("Ocurrió un error inesperado. Intenta nuevamente.");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Nueva contraseña</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input de contraseña */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label text-custom">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                            </span>
                            <input
                                id="password"
                                type={showPassword1 ? "text" : "password"}
                                className="form-control form-control-admin"
                                {...register("password", {
                                    required: true
                                })}
                                placeholder="Ingrese una contraseña"
                                onChange={(e) => validatePassword(e.target.value)}
                            />
                            <span
                                className="input-group-text span"
                                onClick={() => setShowPassword1(!showPassword1)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                            </span>
                        </div>
                        {errors.password && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                        {password1Active && (
                            <div id="passwordCriteria" className="mt-2">
                                <p className={`criteria ${passwordCriteria.hasUppercase ? 'text-success' : 'text-danger'}`}>
                                    {passwordCriteria.hasUppercase ? '✔ Una mayúscula' : '❌ Una mayúscula'}
                                </p>
                                <p className={`criteria ${passwordCriteria.hasLowercase ? 'text-success' : 'text-danger'}`}>
                                    {passwordCriteria.hasLowercase ? '✔ Una minúscula' : '❌ Una minúscula'}
                                </p>
                                <p className={`criteria ${passwordCriteria.hasNumber ? 'text-success' : 'text-danger'}`}>
                                    {passwordCriteria.hasNumber ? '✔ Un número' : '❌ Un número'}
                                </p>
                                <p className={`criteria ${passwordCriteria.hasSpecialChar ? 'text-success' : 'text-danger'}`}>
                                    {passwordCriteria.hasSpecialChar ? '✔ Un carácter especial' : '❌ Un carácter especial'}
                                </p>
                                <p className={`criteria ${passwordCriteria.hasMinLength ? 'text-success' : 'text-danger'}`}>
                                    {passwordCriteria.hasMinLength ? '✔ Al menos 8 caracteres' : '❌ Al menos 8 caracteres'}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Input para confirmar contraseña */}
                    <div className="mb-3 position-relative mb-3">
                        <label htmlFor="password2" className="form-label text-custom">Confirma contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                            </span>
                            <input
                                id="password2"
                                type={showPassword2 ? "text" : "password"}
                                className="form-control form-control-admin"
                                {...register("password2", {
                                    required: true
                                })}
                                placeholder="Confirme contraseña"
                                onChange={(e) => validatePassword(e.target.value, false)}
                            />
                            <span
                                className="input-group-text span"
                                onClick={() => setShowPassword2(!showPassword2)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                            </span>
                        </div>
                        {errors.password2 && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                        {password2Active && (
                            <div id="password2Criteria" className="mt-2">
                                <p className={`criteria ${password2Criteria.hasUppercase ? 'text-success' : 'text-danger'}`}>
                                    {password2Criteria.hasUppercase ? '✔ Una mayúscula' : '❌ Una mayúscula'}
                                </p>
                                <p className={`criteria ${password2Criteria.hasLowercase ? 'text-success' : 'text-danger'}`}>
                                    {password2Criteria.hasLowercase ? '✔ Una minúscula' : '❌ Una minúscula'}
                                </p>
                                <p className={`criteria ${password2Criteria.hasNumber ? 'text-success' : 'text-danger'}`}>
                                    {password2Criteria.hasNumber ? '✔ Un número' : '❌ Un número'}
                                </p>
                                <p className={`criteria ${password2Criteria.hasSpecialChar ? 'text-success' : 'text-danger'}`}>
                                    {password2Criteria.hasSpecialChar ? '✔ Un carácter especial' : '❌ Un carácter especial'}
                                </p>
                                <p className={`criteria ${password2Criteria.hasMinLength ? 'text-success' : 'text-danger'}`}>
                                    {password2Criteria.hasMinLength ? '✔ Al menos 8 caracteres' : '❌ Al menos 8 caracteres'}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-custom text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;