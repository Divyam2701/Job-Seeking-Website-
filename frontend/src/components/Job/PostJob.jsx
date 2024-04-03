// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [fixedSalary, setFixedSalary] = useState("");
    const [salaryType, setSalaryType] = useState("default");
    const [loading, setLoading] = useState(false); // Add loading state
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthorized || (user && user.role !== "Employer")) {
            navigateTo("/");
        }
    }, [isAuthorized, user, navigateTo]);

    const handleJobPost = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before making the request

        try {
            const postData = {
                title,
                description,
                category,
                country,
                city,
                location,
                ...(salaryType === "Fixed Salary" ? { fixedSalary } : { salaryFrom, salaryTo }),
            };

            await axios.post("http://localhost:3000/api/v1/job/post", postData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json", // Fix content type header
                },
            });

            toast.success("Job posted successfully");
            // Clear form fields after successful submission
            setTitle("");
            setDescription("");
            setCategory("");
            setCountry("");
            setCity("");
            setLocation("");
            setSalaryFrom("");
            setSalaryTo("");
            setFixedSalary("");
            setSalaryType("default");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    return (
        <div className="job_post page">
            <div className="container">
                <h3>POST NEW JOB</h3>
                <form onSubmit={handleJobPost}>
                    {/* Your form inputs go here */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Posting..." : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Jobs;
