import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || "",
        name: user?.name || "",
        apellidoP: user?.apellidoP || "",
        telefono: user?.telefono || "",
        email: user?.email || "",
        password: "",
    });

    const [profileImage, setProfileImage] = useState(user?.imagen || "../../../public/error-404.jpg");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="container" style={{ backgroundColor: '#fff5eb', minHeight: '100vh', padding: '2rem' }}>
            <div className="card-admin">
                <div className="row g-0">
                    {/* Datos del Usuario */}
                    <div className="col-md-8 p-4">
                        <h2 className="card-title mb-1">Perfil de {formData.username}</h2>
                        <p className="subtitle-admin mb-4">Gestiona tu información personal</p>

                        <form className="row g-4">
                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="username"> Nombre de usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPencil} style={{ color: '#db5802' }} />
                                    </span>
                                    <input type="text" value={formData.username} onChange={handleChange} className="form-control form-control-admin" id="username" placeholder="@usuario" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="name"> Nombre real</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPencil} style={{ color: '#db5802' }} />
                                    </span>
                                    <input type="text" value={formData.name} onChange={handleChange} className="form-control form-control-admin" id="name" placeholder="Ingresa tu nombre real" />
                                </div>

                            </div>

                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="apellidoP"> Apellido Paterno</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPencil} style={{ color: '#db5802' }} />
                                    </span>
                                    <input type="text" value={formData.apellidoP} onChange={handleChange} className="form-control form-control-admin" id="apellidoP" placeholder="Ingresa tu apellido paterno" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="text-custom" htmlFor="telefono"> Teléfono</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPencil} style={{ color: '#db5802' }} />
                                    </span>
                                    <input type="text" value={formData.telefono} onChange={handleChange} className="form-control form-control-admin" id="telefono" placeholder="Ingresa tu número de teléfono" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="text-custom" htmlFor="email"> Correo electrónico</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faPencil} style={{ color: '#db5802' }} />
                                    </span>
                                    <input type="email" value={formData.email} onChange={handleChange} className="form-control form-control-admin" id="email" placeholder="ejemplo@ejemplo.com" />
                                </div>
                            </div>

                            {/* Campo de contraseña con opción de mostrar/ocultar */}
                            <div className="col-12">
                                <label className="text-custom" htmlFor="password">Confirmar Contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text span">
                                        <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control form-control-admin"
                                        id="password"
                                        placeholder="********"
                                    />
                                    <span className="input-group-text span" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                                <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                            </div>
                        </form>
                    </div>

                    {/* Imagen de Perfil */}
                    <div className="col-md-4 bg-light p-4 d-flex flex-column align-items-center justify-content-center">
                        <img src={profileImage} alt="Foto de perfil" className="image-preview mb-3" style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }} />
                        <div className="upload-btn-wrapper">
                            <label className="btn btn-custom-cancel text-white w-100">
                                <i className="bi bi-camera me-2"></i>Cambiar Foto
                                <input type="file" name="profile_photo" accept="image/*" onChange={handleImageChange} hidden />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
