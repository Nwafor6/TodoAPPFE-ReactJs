import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../components/apiConfig"
import { Link, Navigate, useNavigate } from "react-router-dom";

const Signup =()=>{
const navigate = useNavigate();
const [email, setemail]=useState("");
const [password, setpassword]=useState("");
const [username, setusername]=useState("");
const [response_msg, setresponse_msg]=useState("");

async function handleUserRegister(e){
    e.preventDefault();
    document.querySelector("#sbtBtn").style.display="none"
    document.querySelector("#resbtn").style.display="inline-block"
    const response = await fetch(`${BASE_URL}signup`,{
        method:"POST",
        body: JSON.stringify({email:email, password:password, username:username}),
        headers:{
            // Authorization: `Bearer ${user.access}`,
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if (response.ok){
        document.querySelector("#sbtBtn").style.display="block"
        document.querySelector("#resbtn").style.display="none"
        console.log(response, "data is ok")
        localStorage.setItem("user_data", data.token)
        setresponse_msg(data.message)
        console.log(data)
        document.querySelector(".success_msg").style.display="block"
        setTimeout(()=>{
            document.querySelector(".success_msg").style.display="none"
            navigate("/")
        }, 2000)
    }else{
        document.querySelector("#sbtBtn").style.display="block"
        document.querySelector("#resbtn").style.display="none"
        console.log(response, "data is bad")
        setresponse_msg(data.message)
        console.log(data.message)
        document.querySelector(".error_msg").style.display="block"
        setTimeout(()=>{
            document.querySelector(".error_msg").style.display="none"
        }, 3000)
    }
    
}
    return(
        <>
        <div className="main">
            <div className="title text-center mb-3">
                <h3>Welcome Onboard!</h3>
            </div>
            <div className="text">
                <p>Let’s help you keep up with your tasks.</p>
            </div>
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
            <form onSubmit={handleUserRegister}>
                <div className="row mt-3">
                    <div className="col-md-6 col-sm-12 mb-3 inputs">
                        <label htmlFor="email" className="mb-2 form-labels">Email Adress</label>
                        <input type="email" className="form-control" name="email" placeholder="Your Email" aria-label="First name" value={email} onChange={(e) => setemail(e.target.value)}/>
                    </div>
                    <div className="col-md-6 col-sm-12 mb-3 inputs">
                        <label htmlFor="email" className="mb-2 form-labels">Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" aria-label="Last name" value={username} onChange={(e) => setusername(e.target.value)}/>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6 col-sm-12 mb-3 inputs">
                        <label htmlFor="email" className="mb-2 form-labels">Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Your password" aria-label="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
                    </div>
                    <div className="text-button text-center mt-5" id="sbtBtn">
                        <button  type="submit" id="sbtbtn2">Sign up</button>
                    </div>
                    
                </div>
                <div className="spinner-border text-center text-primary mt-5" role="status" id="resbtn">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2"><small> Already have a account? <Link to={"/login"}>Login</Link></small></p>
                
            </form>
        </div>
        
        </>
    )
}

export default Signup
