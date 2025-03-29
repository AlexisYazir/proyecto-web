import PropTypes from 'prop-types';

export const Alert = ({ message = "Mensaje predeterminado", onConfirm, onCancel }) => (
    <div>
        {message && <p>{message}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button onClick={onConfirm} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                Confirmar
            </button>
            <button onClick={onCancel} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                Cancelar
            </button>
        </div>
    </div>
);

// Definir los tipos de las props
Alert.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default Alert;
