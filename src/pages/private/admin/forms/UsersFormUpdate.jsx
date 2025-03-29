import axios from "axios";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faQuestionCircle, faAlignLeft, faImage, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const UsersFormUpdate = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const { errors: registerErrors = [], clearErrors, getQuestions, questions, getUser, roles, getRoles, updateUser, getUsers } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [imagenPreview, setImagenPreview] = useState(null);
    const uploadImage = async (file) => {
        toast.info('¡Subiendo imagen!', { autoClose: 3000 });
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

    // Obtener las preguntas 
    useEffect(() => {
        getQuestions();
    }, []);

    // Obtener los roles 
    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        async function loadUser() {
            if (params.id && roles.length > 0) {
                const produ = await getUser(params.id);
                if (produ) {
                    setValue('username', produ.username);
                    setValue('name', produ.name);
                    setValue('apellidoP', produ.apellidoP);
                    setValue('telefono', produ.telefono);
                    setValue('email', produ.email);
                    setValue('respuesta', produ.recuperacion_contrasena[0]?.respuesta || '');
                    setValue('pregunta', produ.recuperacion_contrasena[0]?.pregunta || '');
                    setValue('rol', produ.rol);

                    if (produ.imagen) {  // Si el usuario tiene una imagen guardada
                        setImagenPreview(produ.imagen); // Mostrar la imagen actual
                        setValue('imagen', produ.imagen); // Guardar la URL en el formulario
                    }
                }
            }
        }
        loadUser();
    }, [params.id, roles, setValue]);


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

    //pa registrar wl usuario
    const onSubmit = handleSubmit(async (values) => {
        try {
            // Verificar si hay una imagen seleccionada
            if (values.imageFile) {
                
                const imageUrl = await uploadImage(values.imageFile);
                if (!imageUrl) return; // Detener si la imagen no se subió correctamente
                values.imagen = imageUrl; // Agregar la URL de la imagen a los valores del formulario
            }  else {
                values.imagen = imagenPreview; // Mantener la imagen actual si no se subió una nueva
            }

            // Esperar 3 segundos antes de continuar (opcional)
            await new Promise((resolve) => setTimeout(resolve, 3000));
            if (params.id) {
                const success = await updateUser(params.id, values);
                if (success) {
                    toast.success('Usuario actualizado exitosamente!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    getUsers();
                    navigate('/catalog-users');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocurrio un error inesperado. Intenta nuevamente"   );
            navigate('/catalog-users');
        }

    });

    return (
        <div className="container" style={{ backgroundColor: '#fff5eb', minHeight: '100vh', padding: '2rem' }}>
            <div className="card-admin">
                <div className="row g-0">
                    <div className="col-md-12 p-4">
                        <h2 className="card-title text-center mb-4">Actualizacion de Usuario</h2>
                        <p className="subtitle-admin mb-4 text-center">Actualiza los datos de este usuario</p>
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
                                    <input id="telefono" type="text" className="form-control form-control-admin" {...register("telefono", { required: true })} placeholder='Ingrese número de teléfono' />
                                </div>
                                {errors.telefono && (
                                    <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                        Este campo es obligatorio.
                                    </div>
                                )}
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

                            {/* Input rol de usuario */}
                            <div className="col-md-6">
                                <label htmlFor="rol" className="form-label text-custom">Elije su rol</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faUserShield} style={{ color: '#db5802' }} />
                                    </span>
                                    <select id="rol" className="form-control form-control-admin" style={{ padding: '5px' }}  {...register("rol", { required: true })} >
                                        <option value="">Selecciona un rol</option>
                                        {Array.isArray(roles) && roles.map((rol) => (
                                            <option key={rol._id} value={rol.nombre_rol}>
                                                {rol.nombre_rol}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.rol && (
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
                            {/* Subir imagen */}
                            <div className="mb-3 position-relative">
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

                                {/* Mostrar la imagen actual o la imagen seleccionada */}
                                {imagenPreview && (
                                    <img src={imagenPreview} alt="Foto de Perfil" className="mt-2 img-thumbnail"
                                        style={{ maxWidth: "150px" }} />
                                )}
                            </div>
                            <div className="col-12 d-flex justify-content-center gap-2">
                                <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                                <Link to="/catalog-users" className="btn btn-custom text-white">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersFormUpdate;