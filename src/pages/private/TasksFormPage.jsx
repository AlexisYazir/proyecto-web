import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../context/TasksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faHeading, faAlignLeft } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos que necesitas
import { useEffect } from 'react';
import { get } from 'mongoose';

function TasksFormPage() {
    const { register, handleSubmit, formState: { errors } , setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const { createTask, getTask, updateTask } = useTasks();

    useEffect(() => {
        async function loadTask() {
            if(params.id) {
                const task = await getTask(params.id);
                if(task) {
                    setValue('title', task.title);
                    setValue('description', task.description);
                }
            }
        }
        loadTask();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if(params.id) {
            updateTask(params.id, data);
        }else{
            createTask(data);
        }
        navigate('/tasks');
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Nueva Tarea</h2>
                <form onSubmit={onSubmit}>
                    {/* Input con ícono de título */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="title" className="form-label text-custom">Título de la tarea</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faHeading} style={{ color: '#db5802' }} /> {/* Ícono naranja oscuro */}
                            </span>
                            <input id="title" type="text" className="form-control" {...register("title", { required: true })} placeholder='Escribe el título de la tarea' autoFocus />
                        </div>
                        {errors.title && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input con ícono de descripción */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="description" className="form-label text-custom">Descripción</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} /> {/* Ícono naranja oscuro */}
                            </span>
                            <textarea id="description" rows={3} className="form-control" {...register("description", { required: true })} placeholder='Escribe la descripción de esta tarea'></textarea>
                        </div>
                        {errors.description && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn btn-custom text-white" type="submit">Guardar</button>
                        <button className="btn btn-custom-cancel text-white" type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TasksFormPage;