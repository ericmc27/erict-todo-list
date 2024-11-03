import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { counter } from "@fortawesome/fontawesome-svg-core";
import {fetchData, posting, deleteTodo } from "../fetching.js";

const Home = () => {
	const [todos, setTodos] = useState([{"label":""}]) 
	const currentRef = useRef([]);
	const [counter, setCounter] = useState(0);

	const handleTextChange = (event, index)=>{
		const newTodo = [...todos]
		newTodo[index].label = event.target.value;
		setTodos(newTodo);
	}

	const addNewTodo = async(index)=>{
		await posting(todos[index])
		fetchData(todos, setTodos, setCounter)
	}

	const removeTodo = async(id)=>{
		await deleteTodo(id)
		fetchData(todos, setTodos, setCounter)
	}

	useEffect(()=>{
		if(currentRef.current[todos.length-1]){
			currentRef.current[todos.length-1].focus();
		}
	}, [todos])
	
	useEffect(()=>{
		fetchData(todos, setTodos, setCounter)
	}, [])


	return (
		<>

			{todos.map((todo, index) => (
					<div className="page" style={{marginTop: todos.indexOf(todo)===0 ? "25px" : "0px"}}>
						<div className="dot"></div>
						<input
							type="text"
							value={todo.label}
							placeholder={todos.length===1?"No tasks, add a task." : ""}
							ref={(e)=>(currentRef.current[index] = e)}
							onChange={(event)=>{handleTextChange(event, index)}}
							onKeyUp={(event)=>{if(event.key==="Enter" && todo.label!==''){addNewTodo(index)}}}
							disabled={todo.disabled}
						/>
						{todo.disabled && <FontAwesomeIcon className="icon" onClick={()=>{removeTodo(todo.id)}} icon={faCircleXmark} size="lg" style={{color: "#e62f0f", marginTop: "18px", marginRight: "10px"}} />}
					</div>
			))}
		
			<div className="bottom-block">{counter===1 ? `${counter} item` : `${counter} items`} left</div>
		</>
	);
};

export default Home;
