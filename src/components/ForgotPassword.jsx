import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword =()=>{
    const [response_msg, setresponse_msg]=useState("");
    const navigate = useNavigate();
    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");
    async function handleLogin(e){
        e.preventDefault();
        console.log(password, "Jellll")
        const response = await fetch("http://localhost:8000/login",{
            method:"POST",
            body: JSON.stringify({email:email, password:password}),
            headers:{
                // Authorization: `Bearer ${user.access}`,
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        if (response.ok){
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
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6 col-sm-12 mb-5">
                    <div className="title">
                        <h6>Forgetten password ?</h6>
                    </div>
                    <div className="text">
                        <p>Don’t worry, we can help you get back on track with your account.</p>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-5">
                <div className="main">
                    {/* <div className="title text-center mb-5">
                            <h3>Login</h3>
                    </div> */}
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
                        <form onSubmit={handleLogin}>
                            <div className="row ">
                                <div className="col-md-12 col-sm-12 mb-3 inputs">
                                    <label htmlFor="email" style={{float:"left",fontWeight:"bold"}} className="mb-2">Email Adress</label>
                                    <input type="email" className="form-control" placeholder="Your Email" aria-label="First name" value={email} name="email" onChange={(e) => setemail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="text-button text-center mt-5">
                                <button  type="submit">Reset</button>
                            </div>
                            <p className="mt-2"><small>Don't have a account? <Link to={"/login"}>Sign in</Link></small></p>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default ForgotPassword