import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

export const QuestionPage = () => {
    const { id } = useParams(); 
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { getQuestionUser, errors: loginErrors = [], clearErrors, sendEmail } = useAuth();
    
    // Estado para almacenar la pregunta, la respuesta correcta, el email y el username
    const [pregunta, setPregunta] = useState("");
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(""); 
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    // Obtener la pregunta secreta y datos del usuario
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const resp = await getQuestionUser(id);

                if (resp && resp.recuperacion_contrasena?.length > 0) {
                    //console.log(resp.email);
                    //console.log(resp.username);
                    setPregunta(resp.recuperacion_contrasena[0]?.pregunta || "Pregunta no disponible.");
                    setRespuestaCorrecta(resp.recuperacion_contrasena[0]?.respuesta || ""); // Guarda la respuesta correcta
                    setEmail(resp.email || "");
                    setUsername(resp.username || "");
                } else {
                    setPregunta("No se encontró ninguna pregunta para este usuario.");
                    setRespuestaCorrecta("");
                }
            } catch (error) {
                console.error("Error al obtener la pregunta:", error);
                setPregunta("Error al obtener la pregunta.");
                setRespuestaCorrecta("");
            }
        };

        fetchQuestion();
    }, [id]);

    // Manejar errores de login
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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginErrors, clearErrors]);

    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    // Función para validar la respuesta
    const onSubmit = handleSubmit(async (data) => {
        if (data.respuesta.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase()) {
            toast.success("Respuesta correcta");
            try {
                // Enviar solo los valores de email y username
                const response = await sendEmail({ email, username });
                if (response.status === 200) {
                    toast.success("Correo enviado con éxito");
                }
            } catch (error) {
                console.error("Error al enviar el correo:", error);
                toast.error("Error al enviar el correo");
            }
        } else {
            toast.error("Respuesta incorrecta");
            const timer = setTimeout(() => {
                clearErrors();
            }, 3000);
            return () => clearTimeout(timer);
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Pregunta secreta</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3 position-relative">
                        <h2 className="text-custom text-center mb-4">{pregunta || "Cargando pregunta..."}</h2>
                        <label htmlFor="respuesta" className="form-label text-custom">Respuesta</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input 
                                id="respuesta" 
                                type="text" 
                                className="form-control" 
                                {...register("respuesta", { required: true })} 
                                placeholder='Ingresa tu respuesta correcta' 
                            />
                        </div>
                        {errors.respuesta && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600 }}>Este campo es obligatorio.</div>}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom text-white" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-custom-cancel text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuestionPage;
