import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef  } from "react";
import Navigators from "../components/Navigators"
import BASE_URL from "../components/apiConfig"
const Dashboard= ()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const[profileImage, setProfileImage]=useState("");
    const fileInputRef = useRef(null);
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[username, setUsername]=useState("");
    const[newpassword, setNewpassword]=useState("");
    const[totaltodos, setTotaltodos]=useState("");
    const[todaytodos, setTodaytodos]=useState("");
    const[completedtodos, setCompletedtodo]= useState("")
    const [userData, setUserData]=useState("");
    const [token, setToken]=useState("")
    const [response_msg, setresponse_msg]=useState("");
    if (!localStorage.getItem("user_data")) {
        const navigate = useNavigate();
        navigate("/login");
    }
    const myPics= JSON.parse(localStorage.getItem("myPics"));
    console.log(myPics, "helo1234")
    async function handleUpdateProfile(e){
        e.preventDefault();
        const response= await fetch(`${BASE_URL}/update-profile/${userData.id}`,{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({email:email, password:password, username:username, new_password:newpassword})
        })
        const data = await response.json()
        if (response.ok){
            const user={
                email:data.email,
                username:data.username,
                id:data._id
            }
            localStorage.setItem("user", JSON.stringify(user))
            setEmail(data.email);
            setUsername(data.username);
            setresponse_msg("Profile updated.")
            document.querySelector(".success_msg").style.display="block"
            document.querySelector(".error_msg").style.display="none"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
            }, 5000)
        }else{
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"
            // setTimeout(()=>{
            //     document.querySelector(".error_msg").style.display="none"
            // }, 5000)
        }
        
    }
    async function getTodoSummaries(){
        const resp=await fetch (`${BASE_URL}/tasks`,{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
        })
        const data=await resp.json()
        if (resp.ok){
            setTotaltodos(data.todos.length)
            setTodaytodos(data.todayTodo.length)
            setCompletedtodo(data.completedTodos.length)
            
        }else{
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"            }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        document.querySelector("#editPicbtn").style.display="none"
        document.querySelector("#addPicbtn").style.display="block"
        // setTimeout(()=>{
        //     // if(selectedFile){handleUploadPhoto()} 
        //     console.log(selectedFile, "mememem")
        //     handleUploadPhoto()
        // },3000)
      };
    
    const selectPhoto=()=>{
        fileInputRef.current.click();
        // if (selectedFile){
        //     handleUploadPhoto()
        // }
    }
    async function handleUploadPhoto(){
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(selectedFile, "Heloo 22word")
        console.log("sending file 123")
        const resp=await fetch (`${BASE_URL}/uploads/update-pic/${userData.id}`,{
            method:"PUT",
            headers:{
                // "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_data")}`
            },
            body:formData
        })
        const data= await resp.json()
        if (resp.ok){
            console.log(data)
            const fileInput = document.querySelector('#addPic'); // Replace 'yourFileInputId' with the actual ID of your file input element
            fileInput.value = '';
            document.querySelector("#editPicbtn").style.display="block"
            document.querySelector("#addPicbtn").style.display="none"
            setSelectedFile("")
            const user={
                email:data.email,
                username:data.username,
                id:data._id,
                profileImage:`${BASE_URL}${data.profileImage}`
            }
            localStorage.setItem("myPics", JSON.stringify(`${BASE_URL}${data.profileImage}`))
            localStorage.setItem("user", JSON.stringify(user))
            setProfileImage(`${BASE_URL}${data.profileImage}`)
            setresponse_msg("Profile updated.")
            document.querySelector(".success_msg").style.display="block"
            document.querySelector(".error_msg").style.display="none"
            setTimeout(()=>{
                document.querySelector(".success_msg").style.display="none"
            }, 5000)
        }else{
            setresponse_msg(data.detail)
            document.querySelector(".error_msg").style.display="block"
            document.querySelector(".success_msg").style.display="none"
            // setTimeout(()=>{
            //     document.querySelector(".error_msg").style.display="none"
            // }, 5000)
        }
    }
    useEffect(() => {

        // Retrieve and set token from local storage
        const storedToken = localStorage.getItem("user_data");
        setToken(storedToken);
    
        // Parse user data from local storage and set initial state
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        if (storedUserData) {
            setEmail(storedUserData.email);
            setUsername(storedUserData.username);
            setProfileImage(`${BASE_URL}${storedUserData.profileImage}`)
            setPassword("****");
            setUserData(storedUserData);
        }
    
        // Call the function to get todo summaries
        getTodoSummaries();
    
        // Specify dependencies for the useEffect hook
    }, []); // Empty dependency array means useEffect runs once after the initial render
    
    return(
        <> <div className="tab-menu">
                <div className="back-arrow"><Link to="/tasks"><i className="bi bi-arrow-left-circle"></i></Link></div>
                <div className="menu-drop"></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 top">
                        <div className="upload_img">
                            <div><img src={myPics} alt="" className="profile-img mb-3" /></div>
                            <div><i className="bi bi-plus-circle" id="addPicbtn" onClick={()=>{handleUploadPhoto()}}></i><i class="bi bi-pencil-square" onClick={selectPhoto} id="editPicbtn"></i></div>
                            <form>
                                <input type="file" name="profile_img" id="addPic" ref={fileInputRef} onChange={handleFileChange}/>
                            </form>
                        </div>
                        <div className="text">
                            <p>Welcome Back, {username}!</p>
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
                        
                        <div className=" mb-2">
                                <h6>Update your profile as pleased.</h6>
                        </div>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="content bg-white" id="content">
                            
                                <div className="head">
                                    <div className="text1"><h6>Today's Tasks</h6></div>
                                    <div className="text2"><p>{todaytodos}</p></div>
                                </div>
                                <div className="head">
                                    <div className="text1"><h6>Completed Tasks</h6></div>
                                    <div className="text2"><p>{completedtodos}</p></div>
                                </div>
                                <div className="head">
                                    <div className="text1"><h6>Total Tasks</h6></div>
                                    <div className="text2"><p>{totaltodos}</p></div>
                                </div>
                                <div className="add-form mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="text" className="mb-2 form-labels">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder={email} aria-label="First name" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
                                    </div>
                                </div>
                                <div className="add-form mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="mb-2 form-labels">username</label>
                                        <input type="text" className="form-control" name="username" placeholder="Your username" aria-label="First name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="add-form mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="text" className="mb-2 form-labels">password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Your password" aria-label="First name" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="add-form mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="text" className="mb-2 form-labels">New password</label>
                                        <input type="password" className="form-control" name="new_password" placeholder="Your new password" aria-label="First name" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="text-button text-center mt-3 p-0" style={{float:"right"}}>
                                <button  type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
                {<Navigators/>}
            </div>
        </>
    )
}
export default Dashboard