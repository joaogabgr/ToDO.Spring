import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ReadActivitiesDTO } from '../../type/tasks';
import './tasks.css';

interface TasksProps {
    tasks: ReadActivitiesDTO[];
}

export function Tasks({ tasks }: TasksProps) {
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);

    const handleDotsClick = (taskId: string) => {
        setOpenTaskId(openTaskId === taskId ? null : taskId);
    };

    return (
        <div className="task">
            {tasks.map((task) => (
                <div key={task.id} className="tasks">
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
                            <button className="statusButton">Não iniciado</button>
                            <button className="statusButton">Em andamento</button>
                            <button className="statusButton">Concluído</button>
                            <button className='deleteButton'>Deletar</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
