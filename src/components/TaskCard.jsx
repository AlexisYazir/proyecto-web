import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { Button } from "./ui/Button";

export function TaskCard({ task }) {
    const { deleteTask } = useTasks();

    return (
        <div className="card shadow-sm mb-4" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <header className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p className="card-text">{task.description}</p>
                <p className="date text-muted">{new Date(task.date).toLocaleDateString()}</p>

                <div className="d-flex justify-content-between">
                    <Button 
                        onClick={() => deleteTask(task._id)} 
                        className="btn btn-danger btn-sm"
                    >
                        Eliminar
                    </Button>
                    <Link 
                        to={`/tasks/${task._id}`} 
                        className="btn btn-warning btn-sm"
                    >
                        Editar
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default TaskCard;
