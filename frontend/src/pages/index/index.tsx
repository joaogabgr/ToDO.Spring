import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import api, { links } from '../../api/api';
import { ReadActivitiesDTO } from '../../type/Activities/ReadActivitiesDTO';
import './index.css';
import { Tasks } from '../../components/Activities/Tasks/tasks';
import { CreateFormTasks } from '../Activities/FormTasks/createFormTasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function Index() {
    const [tasks, setTasks] = useState<ReadActivitiesDTO[]>([]);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (authContext.user?.name) {
                const response = await links.readActivities(authContext.user.name);
                setTasks(response.data.model);
            }
        };
        fetchData();
    }, [authContext.user?.name]);

    const handleDrop = async (taskId: string, newStatus: string) => {
        try {
            await links.changeStatus({ id: taskId, status: newStatus });
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddActivities = () => {
        navigate('/create');
    }

    const notStartedTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'DONE');

    return (
        <div className="index">
            <div className="status" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'PENDING')}>
                <h2>Não iniciado</h2>
                <Tasks tasks={notStartedTasks} onDrop={handleDrop} />
            </div>
            <div className="status" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'IN_PROGRESS')}>
                <h2>Em andamento</h2>
                <Tasks tasks={inProgressTasks} onDrop={handleDrop} />
            </div>
            <div className="status" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'DONE')}>
                <h2>Concluído</h2>
                <Tasks tasks={completedTasks} onDrop={handleDrop} />
            </div>
            <FontAwesomeIcon icon={faPlus} className='addActivities' onClick={handleAddActivities}/>
        </div>
    );
}