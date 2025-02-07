import { useContext, useEffect, useState } from "react";
import { CreateActivitiesDTO } from "../../../type/Activities/CreateActivitiesDTO";
import { errorSwal } from "../../../components/swal/errorSwal";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { links } from "../../../api/api";
import './FormTasks.css';
import { useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReadActivitiesDTO } from "../../../type/Activities/ReadActivitiesDTO";
import { UpdateActivitiesDTO } from "../../../type/Activities/UpdateActivitiesDTO";

export function UpdateFormTasks() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const id = useParams().id;
    const [activities, setActivities] = useState<ReadActivitiesDTO>({
        id: '',
        name: '',
        description: '',
        status: '',
        userName: '',
        date: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const response = await links.readActivitiesById(id);
                setActivities(response.data.model);
                console.log(response);
                
            } catch (error) {
                errorSwal('Erro ao carregar tarefa');
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, updateActivities: UpdateActivitiesDTO) => {
        e.preventDefault();
        try {
            await links.updateActivities(updateActivities);
            navigate('/');
        } catch (error) {
            errorSwal('Erro ao criar tarefa');
        }
    };

    const verifyForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const status = (e.currentTarget.elements.namedItem('status') as HTMLSelectElement).value;
        if (!task || !description || !status) {
            errorSwal('Preencha todos os campos');
            return;
        }

        const updateActivities: UpdateActivitiesDTO = {
            id: id || '',
            name: task,
            description: description,
            status: status,
            userId: authContext.user?.name || '',
        };

        handleSubmit(e, updateActivities);
    }

    const handleCloseForm = () => {
        navigate('/');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setActivities(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="form-tasks">
            <FontAwesomeIcon icon={faArrowLeft} className="closeForm" onClick={handleCloseForm}/>
            <h1>FormTasks</h1>
            <form onSubmit={verifyForm}>
                <label htmlFor="task">Tarefa</label>
                <input type="text" name="name" id="name" value={activities.name} onChange={handleChange}/>
                <label htmlFor="description">Descrição</label>
                <input type="text" name="description" id="description" value={activities.description} onChange={handleChange}/>
                <select name="status" id="status" value={activities.status} onChange={handleChange}>
                    <option value="">Selecione uma opção</option>
                    <option value="PENDING">Não iniciado</option>
                    <option value="IN_PROGRESS">Em andamento</option>
                    <option value="DONE">Concluído</option>
                </select>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}