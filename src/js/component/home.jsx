import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { counter } from "@fortawesome/fontawesome-svg-core";


const Home = () => {
	const [todos, setTodos] = useState([{ id: 1, "text": "", disabled: false }]) 
	const currentRef = useRef([]);
	const [counter, setCounter] = useState(0);
	

	const handleTextChange = (event, index)=>{
		const newTodo = [...todos]
		newTodo[index].text = event.target.value;
		setTodos(newTodo);
	}

	const addNewTodo = (index)=>{
		let newTodo = [...todos, {id: todos[index].id+1, "text":"", disabled: false}]
		newTodo[index].disabled = true;
		setTodos(newTodo);
	}

	const removeTodo = (id)=>{
		const newTodo = todos.filter(todo => todo.id !== id);

		if(todos.length===1){
			setTodos([{id: 1, "text":""}])
		}else{
			setTodos(newTodo);
		}
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
							onKeyUp={(event)=>{if(event.key==="Enter" && todo.text!==''){addNewTodo(index), setCounter(counter+1)}}}
							disabled={todo.disabled}
						/>
						{todo.disabled && <FontAwesomeIcon className="icon" onClick={()=>{removeTodo(todo.id), setCounter(counter-1)}} icon={faCircleXmark} size="lg" style={{color: "#e62f0f", marginTop: "18px", marginRight: "10px"}} />}
					</div>
			))}
		
			<div className="bottom-block">{counter===1 ? `${counter} item` : `${counter} items`} left</div>
		</>
	);
};

export default Home;
