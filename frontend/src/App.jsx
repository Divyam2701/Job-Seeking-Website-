// eslint-disable-next-line no-unused-vars
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
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
