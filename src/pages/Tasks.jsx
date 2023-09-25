import React,{useEffect,useState} from "react";
import { AxiosInstance as axios } from "../common/axios";
import {Routes,Route, useLocation } from "react-router-dom";
import {IoLogOutOutline} from "react-icons/io5"

const TaskItem = ({ task,listUUID,index }) => {
    const [isChecked,setIsChecked]=useState(task.completed)
    const [text,setText]=useState(task.text)
  const handleCheckboxChange =async () => {
    const body={listUuid:listUUID,text:task.text,completed:!task.completed}
    const res=await axios.put("/tasks/"+task.uuid,body)
    if (res.status===200){
        console.log("OK")
        setIsChecked(!isChecked)
    }
};
  const handleEditTask = async() => {
    const body={listUuid:listUUID,text,completed:isChecked}
    const res=await axios.put("/tasks/"+task.uuid,body)
    if(res.status===200){
      console.log("ok")
    }
  };
  const handleChange = (event) => {
    setText(event.target.value)
  };
  const handleDeleteTask = async(id) => {
    console.log(18,id)
    const res=await axios.delete("/tasks/"+task.uuid)
    console.log(res.data)
    if(res.status===200){
        window.location.reload()
    }

};

  return (
    <li className="flex justify-center items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <input className='w-full rounded-md  hover:bg-gray-100 text-black-500 font-bold py-2 px-4 ' type="text" value={text} onChange={(e)=>{handleChange(e)}} />
      <button className=' bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4' type="button" onClick={handleEditTask}>
        Edit
      </button>
      <button className=' bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4' onClick={()=>{handleDeleteTask(task.uuid)}}>
        Delete
      </button>
    </li>
  );
};

const Tasks = () => {
    const [tasks,setTasks]=useState([])
    const [input,setInput]=useState("")
    const location=useLocation()
    const listUUID=location.pathname.split("/")[1]
    useEffect(()=>{
      const fetchTasks=async()=>{
          const res=await axios.get("/lists"+location.pathname)
          setTasks([...res.data])
      }
      fetchTasks()
    },[])
    const handleInputChange=async(value)=>{
        setInput(value)
    }
    const handleAddButton=async()=>{
     const body={listUuid:listUUID,text:input,completed:false}
     const res=await axios.post("/tasks",body)
     if(res.status===200){
        window.location.reload()
     }
    }
    const handleOnClick=()=>{
      window.sessionStorage.clear()
      window.location.href="/"
    }
    return (
        <Routes>
            <Route path="/" element={
                <>
                  <button className='fixed top-0 right-0 text-size' onClick={handleOnClick}>
                    <IoLogOutOutline fontSize={"36px"}/>
                  </button>
                <div className="flex flex-col justify-center items-center  mt-5">
                  <div className='flex  justify-center items-center'>
                    <input
                        className='w-full rounded-md  hover:bg-gray-100 text-black-500 font-bold py-2 px-4 '
                        type="text"
                        placeholder={"Add task"}
                        value={input}
                        onChange={(e)=>{handleInputChange(e.target.value)}}
                    />
                  <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={handleAddButton}>Add</button>
                  </div>
                  <ul className="list-none list-inside p-4">
                    {tasks.map((task,index) => (
                        <TaskItem
                        key={task.uuid}
                        task={task}
                        onCheckboxChange={task}
                        listUUID={listUUID}
                        index={index}
                      />
                    ))}
                  </ul>   
                </div>
                </>
            }/> 
        </Routes>

  );
};

export default Tasks;
