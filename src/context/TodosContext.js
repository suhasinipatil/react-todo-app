import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    
    const handleChange = (id) => {
        if(todos.length === 0) return;
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
        if(todos.length === 0) return;
        setTodos([
            ...todos.filter((todo) => {
                return todo.id !== id;
            }),
        ]);
    };

    const addTodoItem = (title, userid) => {
        const newTodo = {
            userId: userid,
            title: title,
            completed: false,
        };
        fetch('http://localhost:8889/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(newTodo),
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data)
                setTodos([...todos, data]);
        })
        .catch(err => console.log(err));
        
    };

    const setUpdate = (updatedTitle, id) => {
        if(todos.length === 0) return;
        setTodos(
            todos.map((todo) => {
                if(todo.id === id){
                    todo.title = updatedTitle;
                }
                return todo;
            })
        );
    };

    function getInitialTodos() {
        const temp = localStorage.getItem('todos');
        const savedTodos = JSON.parse(temp);
        return savedTodos || [];
    }

    useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem('todos', temp);
    } , [todos]);

    return (
        <TodosContext.Provider 
            value={{
                todos,
                handleChange,
                delTodo,
                addTodoItem,
                setUpdate,
        }}>
            {children}
        </TodosContext.Provider>
    );
};
export const useTodosContext = () => useContext(TodosContext);