// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext } from "react";
import './App.css';
import { Context } from './main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJobs from './components/Job/PostJob';
import Application from './components/Application/Application';
import MyApplications from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/user",
                    {
                        withCredentials: true,
                    }
                );
                setUser(response.data.user);
                setIsAuthorized(true);
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        fetchUser();
    }, [setIsAuthorized, setUser]);

    console.log("isAuthorized:", isAuthorized);

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Redirect to home if authenticated */}
                    <Route path="/" element={isAuthorized ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/job/getall" element={<Jobs />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                    <Route path="/application/:id" element={<Application />} />
                    <Route path="/applications/me" element={<MyApplications />} />
                    <Route path="/job/post" element={<PostJobs />} />
                    <Route path="/job/me" element={<MyJobs />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <Toaster />
            </Router>
        </>
    )
}
export default App;
