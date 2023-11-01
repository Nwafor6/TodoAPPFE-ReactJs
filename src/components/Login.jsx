import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../components/apiConfig"
import Cookies from 'js-cookie';

const Login =()=>{
    useEffect(()=>{
        if (localStorage.getItem("user_data")){
            navigate("/dashboard")
        }
    })
    const [response_msg, setresponse_msg]=useState("");
    const navigate = useNavigate();
    const [UserDataJson, setUserDataJson] = useState(null);
    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");
    async function handleLogin(e){
        document.querySelector("#sbtBtn").style.display="none"
        document.querySelector("#resbtn").style.display="inline-block"
    
        e.preventDefault();
        console.log(password, "Jellll")
        const response = await fetch(`${BASE_URL}/login`,{
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
            document.querySelector("#sbtBtn").style.display="block"
            document.querySelector("#resbtn").style.display="none"
            const user={
                email:data.user.email,
                username:data.user.username,
                id:data.user._id
            }
            const myPics=data.profileImage
            localStorage.setItem("myPics", JSON.stringify(myPics))
            localStorage.setItem("user", JSON.stringify(user))
            console.log(data.user)
            setresponse_msg(data.message)
            console.log(data)
            document.querySelector(".success_msg").style.display="block"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
                navigate("/dashboard")
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
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-12 mb-5">
                    <div className="logo">
                        <img src='/images/logo.png' alt="" />
                    </div>
                    <div className="text mt-2">
                        <h6>TODO</h6>
                        <h5>Sigin in</h5>
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
                                <div className="col-md-6 col-sm-12 mb-3 inputs">
                                    <label htmlFor="email" className="mb-2 form-labels">Email Adress</label>
                                    <input type="email" className="form-control" placeholder="Your Email" aria-label="First name" value={email} name="email" onChange={(e) => setemail(e.target.value)}/>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 inputs">
                                <label htmlFor="email" className="text-left mb-2 form-labels">Passoword</label>
                                <input type="password" className="form-control" name="password" placeholder="Your password" aria-label="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
                                <p style={{float:"right", fontSize:"10px"}} ><Link to="/forgot-password">Forgotten password ?</Link></p>
                                </div>
                            </div>
                            <div className="text-button text-center mt-5" id="sbtBtn">
                                <button  type="submit" id="sbtbtn2">Sign in</button>
                            </div>
                            <div className="spinner-border text-center text-primary mt-5" role="status" id="resbtn">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2"><small>Don't have a account? <Link to={"/signup"}>Sign up</Link></small></p>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Login
