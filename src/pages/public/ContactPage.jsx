import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export const ContactPage = () => {


    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Formulario de contacto</h2>

                <form>
                    {/* Input nombre producto */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="correo" className="form-label text-custom">Correo</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="mision" type="text" className="form-control"  placeholder='Ingresa tu dirección de correo' />
                        </div>
                    </div>
                    {/* Input descripcion */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="vision" className="form-label text-custom">Mensaje</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="vision" type="text" className="form-control" placeholder='Ingresa tu mensaje' />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Enviar</button>
                        <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;