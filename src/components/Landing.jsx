import React, {useState, useEffect}from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navigators from "../components/Navigators"
// import ellipse from "../client/public/images/ellipse.png"
const LandingPage = ()=>{
    useEffect(()=>{
        if (localStorage.getItem("user_data")){
            navigate("/dashboard")
        }
    })
    const navigate = useNavigate();
    return(
        <>
            <div className="conatiner">
                <div className="row">
                    <div className="col-md-6 col-sm-12 phone-icon mb-3">
                        <img src='/images/phone.png' alt="" />
                    </div>
                    <div className="col-md-6 col-sm-12 content mb-3">
                        <div className="title">
                            <h6>Get things done with TODOO</h6>
                            <div className="text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor duis sed duis suspendisse et. 
                                Non fames nibh non auctor malesuada ut consectetur. Ut quis id risus elit.
                                </p>
                            </div>
                            <div className="text-button text-center mt-5">
                                <Link  to="/login" id="sbtbtn2">Get started</Link>
                            </div>
                        </div>
                    </div>
                    {<Navigators/>}
                </div>
            </div>
        </>
    )
}

export default LandingPage
