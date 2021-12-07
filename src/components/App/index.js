import React from "react";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../welcome";
import Login from "../Login";
import Signup from "../SignUp";
import ErrorPage from "../ErrorPage";
import '../../App.css'
import ForgetPassword from "../ForgetPassword";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import { IconContext } from "react-icons/lib";

function App() {
  return (
    <Router>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
     <Header/>

    <Routes>
    <Route exact path = "/" element = {<Landing/>}/>
    <Route path = "/welcome" element = {<Welcome/>}/>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/signup" element = {<Signup/>}/>
    <Route path = "/forgetpassword" element = {<ForgetPassword/>}/>
    <Route path = "*" element ={<ErrorPage/>}/>
    </Routes>
    

     <Footer/>
    </IconContext.Provider>
    </Router>
  );
}

export default App;
