import React, {useState, useEffect}from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Home = ()=>{
    useEffect(()=>{
        if (!localStorage.getItem("user_data")){
            navigate("/login")
        }
    })
    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem("user_data");
        navigate("/login")
    }
    return (
        <>
            <h3>Welcome. This is your dashboard</h3>
            <div className="logout">
                <div className="d-grid gap-2 col-6 mx-auto col mt-5">
                    <button className="btn btn-primary" type="button" onClick={handleLogOut}>Logout</button>
                </div>
            </div>
        </>
    )
};
export default Home