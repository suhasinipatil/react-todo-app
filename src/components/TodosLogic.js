import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { TodosProvider } from "context/TodosContext";

const TodosLogic = () => {

    return(
        <TodosProvider>
                <InputTodo/>
                <TodosList/>
        </TodosProvider>
    );
};

export default TodosLogic;