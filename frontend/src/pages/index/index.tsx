import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import api, { links } from '../../api/api';
import { ReadActivitiesDTO } from '../../type/tasks';
import './index.css';
import { Tasks } from '../../components/tasks/tasks'; // Importe o componente Tasks

export function Index() {
    const [tasks, setTasks] = useState<ReadActivitiesDTO[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (authContext.user?.name) {
                const response = await links.readActivities(authContext.user.name);
                setTasks(response.data.model);
            }
        };
        fetchData();
    }, [authContext.user?.name]);

    // Filtrar tarefas por status
    const notStartedTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'DONE');

    return (
        <div className="index">
            <div className="status">
                <h2>Não iniciado</h2>
                <Tasks tasks={notStartedTasks} />
            </div>
            <div className="status">
                <h2>Em andamento</h2>
                <Tasks tasks={inProgressTasks} />
            </div>
            <div className="status">
                <h2>Concluído</h2>
                <Tasks tasks={completedTasks} />
            </div>
        </div>
    );
}