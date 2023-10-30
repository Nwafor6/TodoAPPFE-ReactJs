import { useState, Component} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from "./components/Signup"
import Login from "./components/Login"
import LandingPage from "./components/Landing"
import ForgotPassword from "./components/ForgotPassword"
import TaskList from "./components/TaskList"
import CompletedTask from "./components/CompletedTasks"
import AddTask from "./components/AddTask"
import Dashboard from "./components/Dashboard"

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/tasks" element={<TaskList/>}/>
          <Route path="/completed-tasks" element={<CompletedTask/>}/>
          <Route path="/add-task" element={<AddTask/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
