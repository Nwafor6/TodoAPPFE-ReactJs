import { Link, Navigate, useNavigate } from "react-router-dom";
import Navigators from "../components/Navigators"
import React, {useState, useEffect} from "react"
import BASE_URL from "../components/apiConfig"

const TaskList= ()=>{
    const[todos, setTodos]=useState([]);
    const [response_msg, setresponse_msg]=useState("");
    const myPics= JSON.parse(localStorage.getItem("myPics"));
    async function fetchTodaysTasks (){
        const resp=await fetch (`${BASE_URL}/tasks`,{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
        })
        const data=await resp.json()
        if (resp.ok){
            console.log(data.todayTodo,"data")
            setTodos(data.todayTodo)
        }
    }
    // Handle delete of todo fro the client
    async function handleDeleteTodo(id){
        console.log("data has been called", id)
        const resp=await fetch (`${BASE_URL}/tasks/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
        })
        
        const data= await resp.json()
        if (resp.ok){
            setresponse_msg(data.detail)
            // update the state
            setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
            document.querySelector(".success_msg").style.display="block"
            document.querySelector(".error_msg").style.display="none"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
            }, 5000)
        }else{
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"
        }
    }
    // handle update of todo
    async function handleUpdateTodo(id){
        console.log("update has been called", id)
        const resp=await fetch (`${BASE_URL}/tasks/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
            body: JSON.stringify({completed:true}),
        })
        
        const data= await resp.json()
        if (resp.ok){
            setresponse_msg(data.detail)
            // update the state
            fetchTodaysTasks()
            document.querySelector(".success_msg").style.display="block"
            document.querySelector(".error_msg").style.display="none"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
            }, 5000)
        }else{
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"
        }
    }
    useEffect(()=>{
        fetchTodaysTasks()
    },[])
    return(
        <> 
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 top">
                        <div className="img mb-3">
                            <img src={myPics} alt="" className="profile-img"/>
                        </div>
                        <div className="text">
                            <p>Welcome Back!</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12" >
                         {/* Alert */}
                         <div className="error_msg text-center mb-3">
                            <div className="alert alert-danger" role="alert">
                            { response_msg}
                            </div>
                        </div>
                        <div className="success_msg text-center mb-3">
                            <div className="alert alert-success" role="alert">
                            { response_msg}
                            </div>
                        </div>
                        {/* end alert */}
                        <div className=" mb-2">
                                <h6>Task for today</h6>
                            </div>
                        <div className="content bg-white" id="content">
                            
                            <div className="head">
                                <div className="text1"><h6>Daily Tasks</h6></div>
                                <div className="text2"><Link to="/add-task"><i class="bi bi-plus-circle"></i></Link></div>
                            </div>
                            {todos.map(todo=>{
                                console.log(todo, "helo123")
                                if(todo.completed){
                                    return(
                                        <div className="lists mt-3">
                                            <div className="completed"><input type="checkbox" name="" id="" key={todo._id} disabled checked/></div>
                                            <div className="text2 sublist">
                                                <div className="text">
                                                    <p>{todo.title}  </p>
                                                </div>
                                                <div className="delete">
                                                    <div className="text2"><i class="bi bi-dash-circle" onClick={()=>{handleDeleteTodo(todo._id)}}></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="lists mt-3">
                                            <div className="completed"><input type="checkbox" name="" id="" key={todo._id} onChange={()=>{handleUpdateTodo(todo._id)}}/></div>
                                            <div className="text2 sublist">
                                                <div className="text">
                                                    <p>{todo.title}  </p>
                                                </div>
                                                <div className="delete">
                                                    <div className="text2"><i class="bi bi-dash-circle" onClick={()=>{handleDeleteTodo(todo._id)}}></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="text-button text-center mt-3 p-3" style={{float:"right"}}>
                            <Link to="/completed-tasks">See completed <i class="bi bi-arrow-right-circle"></i></Link>
                        </div>
                    </div>
                    {<Navigators/>}
                </div>
            </div>
        </>
    )
}
export default TaskList