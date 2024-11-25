import axios from 'axios'
import React, { useEffect, useState } from "react"

export default function Home() {

  //showTasks
  const [array, setArray] = useState([])

  const fetchAPI = async () =>{
    const response = await axios.get("http://localhost:8000/api")
    setArray(response.data)
  }

  useEffect(()=>{
    fetchAPI()
  },[])

  //addTask
  const [task, setTask] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post('http://localhost:8000/api/todo', { task, isDone });
      setTask(''); 
      setIsDone(false); 
      fetchAPI(); 
  
  };

  //deleteTaskbyID
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/todo/${id}`);
    fetchAPI(); 
  };





  return (
    <div>
    {
    array.map((task, index)=>(
  
        <div key={index}>
          {task.id}
          {task.task}
          {task.isDone}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
    ))
    }


    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} required/>
      <input type="checkbox" id="isDone" checked={isDone} onChange={(e) => setIsDone(e.target.checked)}/>
      <button type="submit">Add Task</button>
    </form>
   </div>
  )
}
