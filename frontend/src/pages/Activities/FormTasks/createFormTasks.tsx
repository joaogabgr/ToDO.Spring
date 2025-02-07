import { useContext } from "react";
import { CreateActivitiesDTO } from "../../../type/Activities/CreateActivitiesDTO";
import { errorSwal } from "../../../components/swal/errorSwal";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { links } from "../../../api/api";
import './FormTasks.css';
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faBackward, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CreateFormTasks() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, newTask: CreateActivitiesDTO) => {
        e.preventDefault();
        try {
            links.createActivities(newTask);
            navigate('/');
        } catch (error) {
            errorSwal('Erro ao criar tarefa');
        }
    };

    const verifyForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = e.currentTarget.task.value;
        const description = e.currentTarget.description.value;
        const status = e.currentTarget.status.value;
        if (!task || !description || !status) {
            errorSwal('Preencha todos os campos');
            return;
        }

        const newTask: CreateActivitiesDTO = {
            name: task,
            description: description,
            status: status,
            userId: authContext.user?.name || '',
        };

        handleSubmit(e, newTask);
    }

    const HandleCloseForm = () => {
        navigate('/');
    }
    
    return (
        <div className="form-tasks">
            <FontAwesomeIcon icon={faArrowLeft} className="closeForm" onClick={HandleCloseForm}/>
            <h1>FormTasks</h1>
            <form onSubmit={verifyForm}>
                <label htmlFor="task">Tarefa</label>
                <input type="text" name="task" id="task" />
                <label htmlFor="description">Descrição</label>
                <input type="text" name="description" id="description" />
                <select name="status" id="status">
                    <option value="">Selecione uma opção</option>
                    <option value="PENDING">Não iniciado</option>
                    <option value="IN_PROGRESS">Em andamento</option>
                    <option value="DONE">Concluído</option>
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}