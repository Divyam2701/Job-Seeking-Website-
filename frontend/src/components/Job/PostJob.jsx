// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
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
    const [loading, setLoading] = useState(false);
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthorized || (user && user.role !== "Employer")) {
            navigateTo("/");
        }
    }, [isAuthorized, user, navigateTo]);

    const handleJobPost = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const postData = {
                title,
                description,
                category,
                country,
                city,
                location,
                ...(salaryType === "Fixed Salary"
                    ? { fixedSalary }
                    : { salaryFrom, salaryTo }),
            };

            await axios.post("http://localhost:3000/api/v1/job/post", postData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
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
            // Redirect to jobs list
            navigateTo("/job/getall");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job_post page">
            <div className="container">
                <h3>POST NEW JOB</h3>
                <form onSubmit={handleJobPost}>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Job Description (min 30 chars)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={30}
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN STACK Development">MERN STACK Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="Game Development">Game Development</option>
                        <option value="MEAN Stack Development">MEAN Stack Development</option>
                        <option value="MEVN Stack Development">MEVN Stack Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Location (min 20 chars)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        minLength={20}
                        required
                    />
                    <select
                        value={salaryType}
                        onChange={(e) => setSalaryType(e.target.value)}
                        required
                    >
                        <option value="default">Select Salary Type</option>
                        <option value="Fixed Salary">Fixed Salary</option>
                        <option value="Ranged Salary">Ranged Salary</option>
                    </select>
                    {salaryType === "Fixed Salary" && (
                        <input
                            type="number"
                            placeholder="Fixed Salary"
                            value={fixedSalary}
                            onChange={(e) => setFixedSalary(e.target.value)}
                            required
                        />
                    )}
                    {salaryType === "Ranged Salary" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                type="number"
                                placeholder="Salary From"
                                value={salaryFrom}
                                onChange={(e) => setSalaryFrom(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Salary To"
                                value={salaryTo}
                                onChange={(e) => setSalaryTo(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading ? "Posting..." : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJobs;
