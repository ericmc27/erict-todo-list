import React, {useEffect, useState, useRef} from "react";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([{"text": ""}])
	const todosRefs = useRef([]);
	const dot = <div className="dot"></div>
	
	const handleInput = (index, event)=>{
			const newTodos = [...todos];
			newTodos[index].text = event.target.value;
			setTodos(newTodos);

	}

	const addTodo = (event)=>{
		const newTodos = [...todos, {"text":""}]
		setTodos(newTodos)
	}

	useEffect(() => {
		if (todosRefs.current[todos.length - 1]) {
			todosRefs.current[todos.length - 1].focus(); // Focus on the new input
		}
	}, [todos]); // Run this effect when todos change

	return (
		<>
			{todos.map((todo, index)=>(
				<div className="page" style={{marginTop: index===0 ? "25px" : "0px"}}>
					{dot}
					<input
					ref={(el)=>(todosRefs.current[index] = el)}
					type="text"
					value={todo.text}
					onChange={(event)=>{handleInput(index, event)}}
					onKeyUp={(e)=>{if(e.key === "Enter"){addTodo(e)}}}
					disabled={index < todos.length - 1}/>
							
				</div>
			))}
		
			<div className="bottom-block">{todos.length-1} {todos.length===0 ? "item" : "items"} left</div>
		
		</>
	);
};

export default Home;
