import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([{ id: 1, "text": "" }]) 
	const [lastTodoIndex, setLastTodoIndex] = useState(-1);
	const currentRef = useRef([]);
	
	console.log(todos)
	const handleTextChange = (event, index)=>{
		const newTodo = [...todos]
		newTodo[index].text = event.target.value;
		setTodos(newTodo);
	}

	const addNewTodo = (index)=>{
		const newTodo = [...todos, {id: todos[index].id+1, "text":""}]
		setTodos(newTodo);
		setLastTodoIndex(todos.length)
	}

	const removeTodo = (id)=>{
		const newTodo = todos.filter(todo => todo.id !== id);

		if(todos.length===1){
			setTodos([{id: 1, "text":""}])
		}else{
			setTodos(newTodo);
		}

		setLastTodoIndex(todos.length-1)
	}

	useEffect(()=>{
		if(currentRef.current[todos.length-1]){
			currentRef.current[todos.length-1].focus();
		}
	}, [todos])

	return (
		<>

			{todos.map((todo, index) => (
					<div className="page" style={{marginTop: todos.indexOf(todo)===0 ? "25px" : "0px"}}>
						<div className="dot"></div>
						<input
							type="text"
							value={todo.text}
							placeholder={todos.length===1?"No tasks, add a task." : ""}
							ref={(e)=>(currentRef.current[index] = e)}
							onChange={(event)=>{handleTextChange(event, index)}}
							onKeyUp={(event)=>{if(event.key==="Enter"){addNewTodo(index)}}}
							disabled={index < lastTodoIndex}
						/>
						{index >= 0 && <FontAwesomeIcon className="icon" onClick={()=>{removeTodo(todo.id)}} icon={faCircleXmark} size="lg" style={{color: "#e62f0f", marginTop: "18px", marginRight: "10px"}} />}
					</div>
			))}
			<div className="bottom-block">{todos.length-1}</div>
		</>
	);
};

export default Home;
