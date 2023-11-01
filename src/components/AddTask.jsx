import { Link, Navigate, useNavigate } from "react-router-dom";
import Navigators from "../components/Navigators"
import React, {useState, useEffect} from "react"
import BASE_URL from "../components/apiConfig"

const AddTask= ()=>{
    const myPics= JSON.parse(localStorage.getItem("myPics"));
    const[title, setTitle]=useState("");
    const [response_msg, setresponse_msg]=useState("");
    async function handleAddTask(e){
        document.querySelector("#sbtBtn").style.display="none"
        document.querySelector("#resbtn").style.display="inline-block"
        e.preventDefault();
        const resp = await fetch(`${BASE_URL}/add-todo`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
            body: JSON.stringify({title:title}),
        })
        const data= await resp.json()
        if (resp.ok){
            document.querySelector("#sbtBtn").style.display="block"
            document.querySelector("#resbtn").style.display="none"
            setTitle("")
            setresponse_msg(data.detail)
            document.querySelector(".success_msg").style.display="block"
            document.querySelector(".error_msg").style.display="none"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
            }, 5000)
        }else{
            document.querySelector("#sbtBtn").style.display="block"
            document.querySelector("#resbtn").style.display="none"
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"
        }

    }

    return(
        <> <div className="tab-menu">
                <div className="back-arrow"><Link to="/tasks"><i class="bi bi-arrow-left-circle"></i></Link></div>
                <div className="menu-drop"></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 top">
                        <div className="img">
                            <img src={myPics} alt="" />
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
                                <h6>Set up your task for today to make today productive.</h6>
                            </div>
                        <form onSubmit={handleAddTask} id="todoform">
                            <div className="content bg-white" id="content">
                                
                                <div className="head">
                                    <div className="text1"><h6>Daily Task</h6></div>
                                    <div className="text2"><i class="bi bi-plus-circle"></i></div>
                                </div>
                                <div className="add-form mt-3">

                                    <div className="mb-3">
                                        <label htmlFor="text" className="mb-2 form-labels">Title</label>
                                        <textarea className="form-control" placeholder="Required example textarea" value={title} required onChange={(e)=>setTitle(e.target.value)}></textarea>
                                    </div>
                                </div>
                                
                            </div>
                            <div style={{float:"right"}}>
                                <div className="text-button text-center mt-3 p-0" id="sbtBtn">
                                    <button  type="submit">Create</button>
                                </div>
                                <div className="spinner-border text-center text-primary mt-3" role="status" id="resbtn"> 
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {<Navigators/>}
            </div>
        </>
    )
}
export default AddTask