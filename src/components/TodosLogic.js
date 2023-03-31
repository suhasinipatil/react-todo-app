import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { useState } from "react";

const TodosLogic = () => {
   // const [todos, setTodos] = useState([]);
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'Setup development environmet',
            completed: true,
        },
        {
            id: 2,
            title: 'Develop website and add content',
            completed: false,
          },
          {
            id: 3,
            title: 'Deploy to live server',
            completed: false,
          },
    ]);

    const handleChange = (id) => {
        setTodos((prevState) => 
            prevState.map((todo) => {
                if(todo.id === id){
                    return{
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            })
        );
    }

    const delTodo = (id) => {
        setTodos([
            ...todos.filter((todo) => {
                return todo.id !== id;
            }),
        ]);
    };

    const addTodoItem = (title) => {
        const newTodo = {
            id : 4,
            title: title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    return(
        <div>
            <InputTodo addTodoItem={addTodoItem}/>
            <TodosList todosProps={todos} setTodos={setTodos} handleChange={handleChange} delTodo={delTodo}/>
        </div>
    );
};

export default TodosLogic;