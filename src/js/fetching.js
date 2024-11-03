const axios = require("axios")

export const fetching = async()=>{
    try{
        const response = await axios.get("https://playground.4geeks.com/todo/users/Eric")
        const data = response.data.todos
    
        if (data.length===0){
            return 0
        }else{
            return data
        }

    }catch (err){
        if (err.status===404){
            await axios.post("https://playground.4geeks.com/todo/users/Eric")
            fetching()
        }
    }
   
}

export const fetchData = async(todos, setTodos, setCounter)=>{
    const data = await fetching();
    let transformData;
    
    if (data!==0){
        transformData = data.map(item=>({
            ...item,
            disabled: true

        }))
    }
    if (data===0){
        setCounter(0)
        setTodos([{...todos[0], ...{"label": "", "is_done":false, disabled: false}}])
    }else{
        setCounter(transformData.length)
        transformData.push({"label": "", "is_done":false, disabled: false})
        setTodos(transformData)
    }
}


export const posting = async(todo)=>{
    const response = await axios.post("https://playground.4geeks.com/todo/todos/Eric", {
        "label": todo.label,
        "is_done": false
    })
}

export const deleteTodo = async(id)=>{
    const response = await axios.delete(`https://playground.4geeks.com/todo/todos/${id}`)
}


