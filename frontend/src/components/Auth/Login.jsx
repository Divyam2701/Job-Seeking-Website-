/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {Context} from '../../main';
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";



const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("");
      
        const { isAuthorized, setIsAuthorized } = useContext(Context);
      
        const handleLogin = async (e) => {
          e.preventDefault();
          try {
            const { data } = await axios.post(
              "http://localhost:3000/api/v1/user/login",
              { email, password, role },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            toast.success(data.message);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        };
        if(isAuthorized){
            return <Navigate to={'/'}/>
          }
    return(
        <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login is disabled. You are auto-logged in as Demo User.</h3>
          </div>
        </div>
      </section>

    )
}

export default Login