import { useForm } from 'react-hook-form';
import axios from "axios";
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faQuestionCircle, faAlignLeft, faImage, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function RegisterPage() {
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const { signup, errors: registerErrors = [], clearErrors, getQuestions, questions } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [imagenPreview, setImagenPreview] = useState(null);

    // Para validar los criterios de contraseña
    const [passwordCriteria1, setPasswordCriteria1] = useState({
        hasUppercase: null,
        hasLowercase: null,
        hasNumber: null,
        hasSpecialChar: null,
        hasMinLength: null,
    });

    const [passwordCriteria2, setPasswordCriteria2] = useState({
        hasUppercase: null,
        hasLowercase: null,
        hasNumber: null,
        hasSpecialChar: null,
        hasMinLength: null,
    });

    const validatePassword1 = (password) => {
        const criteria = {
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 8,
        };
        setPasswordCriteria1(criteria);
    };

    const validatePassword2 = (password) => {
        const criteria = {
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 8,
        };
        setPasswordCriteria2(criteria);
    };


    // Obtener las preguntas al montar el componente
    useEffect(() => {
        getQuestions();
    }, []);

    // Limpiar errores después de 4 segundos
    useEffect(() => {
        if (registerErrors.length > 0) {
            registerErrors.forEach(error => {
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
    }, [registerErrors, clearErrors]);

    // Limpiar errores cuando el usuario comienza a modificar los campos
    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                params: { key: "d585d07902967638dd5a9aa7986dd636" }, // Reemplaza con tu API Key de imgbb
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            return response.data.data.url; // Retorna la URL de la imagen subida
        } catch (error) {
            console.error("Error al subir la imagen", error);
            toast.error("Error al subir la imagen. Revisa tu conexión e intenta nuevamente");
            return null;
        }
    };
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenPreview(URL.createObjectURL(file)); // Previsualizar imagen
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setValue("imagen", imageUrl); // Guardar la URL en el formulario
            }
        }
    };
    
    const onSubmit = handleSubmit(async (values) => {
        try {
            toast.info('¡Subiendo imagen!', { autoClose: 3000 });
    
            // Verificar si hay una imagen seleccionada
            if (values.imageFile) {
                const imageUrl = await uploadImage(values.imageFile);
                if (!imageUrl) return; // Detener si la imagen no se subió correctamente
                values.imagen = imageUrl; // Agregar la URL de la imagen a los valores del formulario
            }
    
            // Esperar 3 segundos antes de continuar (opcional)
            await new Promise((resolve) => setTimeout(resolve, 3000));
    
            // Registrar al usuario
            const success = await signup(values);
            if (success) {
                toast.success('¡Registro exitoso!', { autoClose: 3000 });
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            toast.error("Error al subir la imagen o registrar usuario");
            console.error(error);
        }
    });
    

    return (
        <div className="container" style={{ backgroundColor: '#fff5eb', minHeight: '100vh', padding: '2rem' }}>
            <div className="card-admin">
                <div className="row g-0">
                    <div className="col-md-12 p-4">
                        <h2 className="card-title text-center mb-4">Registro de Usuario</h2>
                        {/* {registerErrors.length > 0 && registerErrors.map((error, i) => (
                            <div className="alert mb-3" key={i} style={{ backgroundColor: "#f8d7da", color: "#c23616" }}>
                                {error}
                            </div>
                        ))} */}

                        <form className="row g-4" onSubmit={onSubmit}>
                            {/* Input nombre usuario */}
                            <div className="col-md-6">
                                <label htmlFor="username" className="form-label text-custom">Nombre de usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="username" type="text" className="form-control form-control-admin" {...register("username", { required: true })} placeholder='Ingrese nombre de usuario' />
                                </div>
                                {errors.username && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input NOMBRE */}
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label text-custom">Nombre real</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="name" type="text" className="form-control form-control-admin" {...register("name", { required: true })} placeholder='Ingrese nombre real' />
                                </div>
                                {errors.name && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input pa APELLIDO */}
                            <div className="col-md-6">
                                <label htmlFor="apellidoP" className="form-label text-custom">Apellido paterno</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="apellidoP" type="text" className="form-control form-control-admin" {...register("apellidoP", { required: true })} placeholder='Ingrese apellido paterno' />
                                </div>
                                {errors.apellidoP && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input TELEFONO */}
                            <div className="col-md-6">
                                <label htmlFor="telefono" className="form-label text-custom">Número de teléfono</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPhone} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="telefono" type="number" className="form-control form-control-admin" {...register("telefono", { required: true })} placeholder='Ingrese número de teléfono' />
                                </div>
                                {errors.telefono && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>

                            {/* Input de contraseña */}
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label text-custom">Contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="form-control form-control-admin"
                                        {...register("password", {
                                            required: true,
                                            validate: (value) => validatePassword1(value)
                                        })}
                                        placeholder="Ingrese una contraseña"
                                        onChange={(e) => validatePassword1(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text span"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                                    </span>
                                </div>
                                {errors.password && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                                <div id="passwordCriteria1" className="mt-2">
                                    <p className={`criteria ${passwordCriteria1.hasUppercase === null ? 'text-muted' : passwordCriteria1.hasUppercase ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria1.hasUppercase === null ? 'Debe contener una mayúscula' : passwordCriteria1.hasUppercase ? '✔ Una mayúscula' : '❌ Una mayúscula'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria1.hasLowercase === null ? 'text-muted' : passwordCriteria1.hasLowercase ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria1.hasLowercase === null ? 'Debe contener una minúscula' : passwordCriteria1.hasLowercase ? '✔ Una minúscula' : '❌ Una minúscula'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria1.hasNumber === null ? 'text-muted' : passwordCriteria1.hasNumber ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria1.hasNumber === null ? 'Debe contener un número' : passwordCriteria1.hasNumber ? '✔ Un número' : '❌ Un número'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria1.hasSpecialChar === null ? 'text-muted' : passwordCriteria1.hasSpecialChar ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria1.hasSpecialChar === null ? 'Debe contener un carácter especial' : passwordCriteria1.hasSpecialChar ? '✔ Un carácter especial' : '❌ Un carácter especial'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria1.hasMinLength === null ? 'text-muted' : passwordCriteria1.hasMinLength ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria1.hasMinLength === null ? 'Debe tener al menos 8 caracteres' : passwordCriteria1.hasMinLength ? '✔ Al menos 8 caracteres' : '❌ Al menos 8 caracteres'}
                                    </p>
                                </div>
                            </div>
                            {/* Input para confirmar contraseña */}
                            <div className="col-md-6">
                                <label htmlFor="password2" className="form-label text-custom">Confirma contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                                    </span>
                                    <input
                                        id="password2"
                                        type={showPassword ? "text" : "password"}
                                        className="form-control form-control-admin"
                                        {...register("password2", {
                                            required: true,
                                            validate: (value) => validatePassword2(value)
                                        })}
                                        placeholder="Confirme contraseña"
                                        onChange={(e) => validatePassword2(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text span"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                                    </span>
                                </div>
                                {errors.password2 && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                                <div id="passwordCriteria2" className="mt-2">
                                    <p className={`criteria ${passwordCriteria2.hasUppercase === null ? 'text-muted' : passwordCriteria2.hasUppercase ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria2.hasUppercase === null ? 'Debe contener una mayúscula' : passwordCriteria2.hasUppercase ? '✔ Una mayúscula' : '❌ Una mayúscula'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria2.hasLowercase === null ? 'text-muted' : passwordCriteria2.hasLowercase ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria2.hasLowercase === null ? 'Debe contener una minúscula' : passwordCriteria2.hasLowercase ? '✔ Una minúscula' : '❌ Una minúscula'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria2.hasNumber === null ? 'text-muted' : passwordCriteria2.hasNumber ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria2.hasNumber === null ? 'Debe contener un número' : passwordCriteria2.hasNumber ? '✔ Un número' : '❌ Un número'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria2.hasSpecialChar === null ? 'text-muted' : passwordCriteria2.hasSpecialChar ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria2.hasSpecialChar === null ? 'Debe contener un carácter especial' : passwordCriteria2.hasSpecialChar ? '✔ Un carácter especial' : '❌ Un carácter especial'}
                                    </p>
                                    <p className={`criteria ${passwordCriteria2.hasMinLength === null ? 'text-muted' : passwordCriteria2.hasMinLength ? 'text-success' : 'text-danger'}`}>
                                        {passwordCriteria2.hasMinLength === null ? 'Debe tener al menos 8 caracteres' : passwordCriteria2.hasMinLength ? '✔ Al menos 8 caracteres' : '❌ Al menos 8 caracteres'}
                                    </p>
                                </div>
                            </div>
                            {/* Input correo */}
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label text-custom">Correo electrónico</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="email" type="email" className="form-control form-control-admin" {...register("email", { required: true })} placeholder='Ingrese correo: ejemplo@ejemplo.com' />
                                </div>
                                {errors.email && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Input pregunta secreta */}
                            <div className="col-md-6">
                                <label htmlFor="pregunta" className="form-label text-custom">Elije una pregunta secreta</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#db5802' }} />
                                    </span>
                                    <select id="pregunta" className="form-control form-control-admin" style={{ padding: '5px' }}  {...register("pregunta", { required: true })} >
                                        <option value="">Selecciona una pregunta</option>
                                        {Array.isArray(questions) && questions.map((question) => (
                                            <option key={question._id} value={question.pregunta}>
                                                {question.pregunta}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.pregunta && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            {/* Subir imagen */}
                            <div className="col-md-6">
                                <label htmlFor="imagen" className="form-label text-custom">Foto de Perfil</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faImage} style={{ color: "#db5802" }} />
                                    </span>
                                    <input id="imagen" type="file" accept="image/*"
                                        className="form-control form-control-admin"
                                        onChange={handleImageChange} />
                                </div>
                                {errors.imagen && <div className="text-danger mt-1">Este campo es obligatorio.</div>}
                                {imagenPreview && <img src={imagenPreview} alt="Preview" className="mt-2 img-thumbnail" style={{ maxWidth: "150px" }} />}
                            </div>
                            {/* Input RESPUESTA*/}
                            <div className="col-md-6">
                                <label htmlFor="respuesta" className="form-label text-custom">Respuesta</label>
                                <div className="input-group ">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                                    </span>
                                    <input id="respuesta" type="text" className="form-control form-control-admin" {...register("respuesta", { required: true })} placeholder='Escribe respuesta' />
                                </div>
                                {errors.respuesta && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
                            </div>
                            <div className="col-12 d-flex justify-content-center gap-2">
                                <button className="btn btn-custom-cancel text-white" type="submit">Registrar</button>
                                <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                            </div>
                            <div className="mt-3 text-center">
                                <label htmlFor="email">
                                    ¿Ya tienes una cuanta? <Link to="/login" className="link-naranja">Iniciar sesión</Link> <br />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;