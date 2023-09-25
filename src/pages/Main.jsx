import React from 'react'
import { useEffect,useState } from "react"
import {IoLogOutOutline} from "react-icons/io5"

import {AxiosInstance as axios} from "../common/axios"
function Main() {
        const [data,dataState]=useState([])
        const handleChange = (event,index) => {
          const array=data
          array[index].name=event.target.value 
          dataState([...array])
        };
        const handleAddToDoItem = async() => {
          const newItem = document.getElementById('new-to-do-item').value;
          try {
            const res=await axios.post("/lists",{name:newItem})
            dataState([...data,res.data])
          } catch (error) {
            console.log(error.responseURL)
          }
          document.getElementById('new-to-do-item').value = '';

        };
        const handleOpen=(link)=>{
          window.location.href=`http://localhost:3000/${link}`
        }
        const handleDeleteToDoItem = async(index) => {
          console.log(data[index])
          try {
            const res=await axios.delete("/lists/"+data[index]["uuid"])
            if(res.status===200){
              dataState(data.filter((item, i) => i !== index));
            }
          } catch (error) {
            console.log(error.response)
          }
        };
        const handleEdit = async(uuid,index) => {
          console.log(uuid)
          const res=await axios.put("/lists/"+uuid,data[index])
          if(res.status===200){
            window.location.reload()
          }
        };
        const handleOnClick=()=>{
          window.sessionStorage.clear()
          window.location.reload()
        }
    useEffect(()=>{
        async function getData(){
            const res=await axios.get("/lists")
            dataState(res.data)
        }
        getData()
    },[])
    
    return (
        <div className="flex flex-col justify-center items-center">
          <button className='fixed top-0 right-0 text-size' onClick={handleOnClick}>
            <IoLogOutOutline fontSize={"36px"}/>
          </button>
          <div className='flex  justify-center items-center mt-5'>
          <input className='w-full rounded-md  hover:bg-gray-100 text-black-500 font-bold py-2 px-4 ' type="text"  id="new-to-do-item" placeholder="Add new to-do item..." />
          <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={handleAddToDoItem}>Add</button>
          </div>
          <ul className="list-none list-inside p-4">
            {data.map((item, index) => (
              <li key={index} className="flex justify-center items-center">
                <input className='w-full rounded-md  hover:bg-gray-100 text-black-500 font-bold py-2 px-4 ' type="text" value={item.name} onChange={(e)=>{handleChange(e,index)}} />
                <button className=' bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4' type="button" onClick={()=>{handleEdit(item.uuid,index)}}>
                  Edit
              </button>
                <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4' onClick={() => handleOpen(`${item.uuid}/tasks`)}>
                  Open
                </button>
                <button className=' bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4' onClick={() => handleDeleteToDoItem(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Main