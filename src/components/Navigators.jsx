import { Link, Navigate, useNavigate } from "react-router-dom";



const Navigators =()=>{
    const navigate=useNavigate()
    const handleLogOut=()=>{
        localStorage.removeItem("user_data");
        navigate("/login")
    }
    return (
        <>
            <div className="tab-menu mt-5">
                <div className="menu-drop"><span onClick={handleLogOut}><i class="bi bi-box-arrow-left"></i></span></div>
                <div className="menu-drop"><Link to="/"><i class="bi bi-house"></i></Link></div>
            </div>
        </>
    )
}
export default Navigators