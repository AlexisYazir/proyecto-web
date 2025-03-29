import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Alert from "../../../../components/Alert";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export const UsersCatalog = () => {
    const { getUsers, users, deleteUser, user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 4;

    useEffect(() => {
        getUsers();
    }, []);

    // Filtrar usuarios
    const filteredUsers = Array.isArray(users)
    ? users
        .filter(u => u._id !== user?._id && u.rol !== "Administrador") // Excluir usuario autenticado y usuarios con rol 'Administrador'
        .filter(u =>
            Object.values(u).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    : [];


    // Paginación
    const currentUsers = filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleDeleteUser = async (userId) => {
        toast(
            <Alert
                message="¿Está seguro de eliminar este usuario?"
                onConfirm={() => {
                    deleteUser(userId);
                    toast.dismiss();
                    if (currentUsers.length <= 1 && currentPage > 0) {
                        setCurrentPage(currentPage - 1);
                    }
                }}
                onCancel={() => {
                    toast.dismiss(); // Cierra la notificación después de cancelar
                }}
            />,
            {
                position: "top-right",
                autoClose: false, // Desactiva el cierre
                closeButton: false,
                draggable: false, // Desactiva el arrastre
            }
        );

        getUsers(); // Recargar usuarios despues de eliminar
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center card-title">Catálogo de Usuarios</h1>
            <div className="input-group mb-3">
                <span className="input-group-text span">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {currentUsers.length === 0 ? (
                <p className="text-center">No hay usuarios disponibles para mostrar</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th className="d-none d-md-table-cell">Apellido</th>
                                <th>Rol</th>
                                <th className="d-none d-md-table-cell">Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.username}</td>
                                    <td className="d-none d-md-table-cell">{u.apellidoP}</td>
                                    <td>{u.rol}</td>
                                    <td className="d-none d-md-table-cell">{u.email}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/add-users/${u._id}`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faEdit} /></Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName="pagination justify-content-center mt-3"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        activeClassName="active"
                        nextLabel=">"
                        previousLabel="<"
                    />
                </div>
            )}
        </div>
    );
}

export default UsersCatalog;
