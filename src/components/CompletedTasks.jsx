import { Link, Navigate, useNavigate } from "react-router-dom";
import Navigators from "../components/Navigators"
import React, {useState, useEffect} from "react"
import BASE_URL from "../components/apiConfig"
const CompletedTask= ()=>{
    const myPics= JSON.parse(localStorage.getItem("myPics"));
    const[todos, setTodos]=useState([]);
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
            console.log(data.completedTodos,"data")
            setTodos(data.completedTodos)
        }
    }
    useEffect(()=>{
        fetchTodaysTasks()
    },[])
    return(
        <> <div className="tab-menu mb-3">
                <div className="back-arrow"><Link to="/tasks"><i class="bi bi-arrow-left-circle"></i></Link></div>
                <div className="menu-drop"></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 top">
                        <div className="img mb-3">
                            <img src={myPics} alt="" className="profile-img"/>
                        </div>
                        <div className="text">
                            <p>Congratulations! you have completed these tasks.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12" >
                        
                        <div className=" mb-2">
                                <h6>Completed Task for today</h6>
                            </div>
                        <div className="content bg-white" id="content">
                            
                            <div className="head">
                                <div className="text1"><h6>Daily Task</h6></div>
                                <div className="text2"></div>
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
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        {/* Navigators */}
                        {<Navigators/>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CompletedTask