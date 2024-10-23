import React, { useEffect, useState, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([{ "text": "" }])
	const currentRef = useRef([]);

	const handleText = (event, index)=>{
		const newTodo = [...todos]
		newTodo[index].text = event.target.value;
		setTodos(newTodo);
	}

	const addNewTodo = ()=>{
		const newTodo = [...todos, {"text":""}]
		setTodos(newTodo);
	}

	useEffect(()=>{
		if(currentRef.current[todos.length-1]){
			currentRef.current[todos.length-1].focus();
		}
	}, [todos])

	return (
		<>

			{todos.map((todo, index) => (
				<>
					<div className="page">
						<div className="dot"></div>
						<input
							type="text"
							value={todo.text}
							ref={(e)=>(currentRef.current[index] = e)}
							onChange={(event)=>{handleText(event, index)}}
							onKeyUp={(event)=>{if(event.key==="Enter"){addNewTodo()}}}
						/>
					</div>
				</>
			))}
			<div className="bottom-block"></div>
		</>
	);
};

export default Home;
