import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ReadActivitiesDTO } from '../../../type/Activities/ReadActivitiesDTO';
import './tasks.css';
import { ChangeStatusDTO } from '../../../type/Activities/changeStatusDTO';
import { links } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

interface TasksProps {
    tasks: ReadActivitiesDTO[];
    onDrop: (taskId: string, newStatus: string) => void;
}

export function Tasks({ tasks, onDrop }: TasksProps) {
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDotsClick = (taskId: string) => {
        setOpenTaskId(openTaskId === taskId ? null : taskId);
    };

    const handleChangeStatus = async (id: string, status: string) => {
        const changeStatus: ChangeStatusDTO = {
            id,
            status,
        };

        try {
            await links.changeStatus(changeStatus);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await links.deleteTask(id);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        onDrop(taskId, newStatus);
    };

    const handleEditActivities = (id: String) => {
        navigate(`/update/${id}`);
    }

    return (
        <div className="task" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'PENDING')}>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="tasks"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                >
                    <p className="title">{task.name}</p>
                    <p className="description">{task.description}</p>
                    <p className="createdBy">{task.userName}</p>
                    <p className="date">{new Date(task.date).toLocaleDateString()}</p>
                    <FontAwesomeIcon
                        icon={openTaskId === task.id ? faChevronUp : faChevronDown}
                        className='dots'
                        onClick={() => handleDotsClick(task.id)}
                    />
                    {openTaskId === task.id && (
                        <div className="changeStatus">
                            <button onClick={() => handleChangeStatus(task.id, "PENDING")} className="button statusButton">Não iniciado</button>
                            <button onClick={() => handleChangeStatus(task.id, "IN_PROGRESS")} className="button statusButton">Em andamento</button>
                            <button onClick={() => handleChangeStatus(task.id, "DONE")} className="button statusButton">Concluído</button>
                            <button onClick={() => handleEditActivities(task.id)} className="button editButton">Editar</button>
                            <button onClick={() => handleDelete(task.id)} className='button deleteButton'>Deletar</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}