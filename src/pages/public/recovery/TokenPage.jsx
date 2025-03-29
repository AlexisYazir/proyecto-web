import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const TokenPage = () => {
    const { username } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { verifyToken } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // console.log(username);
            const response = await verifyToken({ username, token: data.token });
            //console.log(response.username);

            if (response) {
                toast.success("Token válido. Puedes continuar.");
                const timer = setTimeout(() => {
                    navigate(`/new-password/${response.username}`);
                }, 3000);
                return () => clearTimeout(timer);
            } else {
                toast.error("Token invalido, intente nuevamente.");
            }
        } catch (error) {
            console.error("Error verificando el token:", error);
            toast.error("Token invalido, intente nuevamente.");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Token</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="token" className="form-label text-custom">Ingresa tu token</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input
                                id="token"
                                type="text"
                                className="form-control"
                                {...register("token", { required: true })}
                                placeholder='Ingresa el token'
                            />
                        </div>
                        {errors.token && <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600 }}>Este campo es obligatorio.</div>}
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
