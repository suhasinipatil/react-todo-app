import TodoItem from "./TodoItem";
import { useTodosContext } from "../context/TodosContext";

const TodosList = () => {
    const { todos } = useTodosContext();

    return(
        <ul>
            {todos.length != 0 && todos.map((todo) => (
                <TodoItem key={todo.id} itemProp={todo}/>
            ))}
        </ul>
    );
};
export default TodosList;