"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {

    const apiURL = "http://localhost:5294/"
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        fetch(`${apiURL}api/todo/GetNotes`)
            .then((response) => response.json())
            .then((data) => { console.log("data", data); setTodos(data); })
            .catch((error) => console.log(error))
    }

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    const addTodo = () => {
        console.log("Add todo");
        const data = new FormData();
        data.append("newNote", newTodo);

        fetch(`${apiURL}api/todo/AddNote`, {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("add todo result", result);
                alert(result);
                setNewTodo("");
                fetchTodos();
            })
            .catch((error) => console.log(error))
    }

    const handleDelete = (id) => {
        console.log("Delete todo");

        fetch(`${apiURL}api/todo/DeleteNote?id=${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("delete todo result", result);
                alert(result);
                fetchTodos();
            })
            .catch((error) => console.log(error))
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Todo App</h1>
            <div>

                <input value={newTodo} onChange={handleChange} onKeyDown={(e) => e.key === "Enter" && addTodo()}/>
                <button onClick={() => addTodo()} >Add</button>
            </div>
            <div>

                <h2>Todo List</h2>
                <ul className={styles.listParent}>
                    {todos && todos.length > 0 && todos.map((todo) => (
                        <li className={styles.listItem} key={todo.id}>{todo.description} <button onClick={() => handleDelete(todo.id)}>Delete</button> </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
