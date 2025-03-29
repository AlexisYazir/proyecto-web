import { Link } from "react-router-dom";

export const OptionsRecovery = () =>{
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
            <h2 className="card-title text-center mb-4">Opciones de recuperacion</h2>
            <form>
                <h4 className='text-custom'>Tienes estas opciones para poder recuperar tu contraseña</h4>
                <div className="mb-3 position-relative">
                    <label htmlFor="username" className="form-label text-custom">Por pregunta secreta</label>
                    <Link to="/question" className="btn btn-custom-cancel text-white">Ir</Link>
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="username" className="form-label text-custom">Por token</label>
                    <Link to="/token" className="btn btn-custom-cancel text-white">Ir</Link>
                </div>
            </form>
        </div>
    </div>
    )
}

export default OptionsRecovery