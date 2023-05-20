import { createContext, useContext, useState, useEffect } from "react";

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([{id: 89, title: ' ', completed: false}]);
    
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
        fetch('http://localhost:8889/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
        })
        .then(() => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        })
        .catch(err => console.log(err));
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
            if(data)
                setTodos([...todos, data]);
        })
        .catch(err => console.log(err));
    };

    const updateTodoList = (userid) => {
        if(userid === undefined) return;
        fetch('http://localhost:8889/todos/' + userid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
                }).then(res => res.json())
                .then(data => {
                    if(data)
                        setTodos(data);
                });
    };

    const setUpdate = (updatedTitle, id) => {
        if(todos.length === 0) return;
        fetch('http://localhost:8889/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({title : updatedTitle}),
        }).then(res => res.json())
        .then(updatedTodo => {
            const updatedTodos = todos.map((todo) => {
                if(todo.id === updatedTodo.id){
                    todo.title = updatedTodo.title;
                    return todo;
                }
                return todo;
            });
            console.log(updatedTodos);
            setTodos(updatedTodos);
        })
        .catch(err => console.log(err));
    };

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
                updateTodoList,
        }}>
            {children}
        </TodosContext.Provider>
    );
};
export const useTodosContext = () => useContext(TodosContext);