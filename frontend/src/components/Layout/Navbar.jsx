// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/v1/user/logout',
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                setIsAuthorized(false);
                navigate('/login');
                toast.success(response.data.message);
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            setIsAuthorized(false);
            navigate('/login');
            toast.error('Failed to logout. Please try again.');
        }
    };

    return (
        <nav className={isAuthorized ? 'navbarShow' : 'navbarHide'}>
            <div className="container">
                <div className="logo">
                    <img src="/JobZee-logos__white.png" alt="logo" />
                </div>
                <ul className={!show ? 'menu' : 'show-menu menu'}>
                    <li>
                        <Link to="/" onClick={() => setShow(false)}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to="/job/getall" onClick={() => setShow(false)}>
                            ALL JOBS
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/applications/me"
                            onClick={() => setShow(false)}
                        >
                            {user && user.role === 'Employer'
                                ? "APPLICANT'S APPLICATIONS"
                                : 'MY APPLICATIONS'}
                        </Link>
                    </li>
                    {user && user.role === 'Employer' ? (
                        <>
                            <li>
                                <Link
                                    to="/job/post"
                                    onClick={() => setShow(false)}
                                >
                                    POST NEW JOB
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/job/me"
                                    onClick={() => setShow(false)}
                                >
                                    VIEW YOUR JOBS
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    <button onClick={handleLogout}>LOGOUT</button>
                </ul>
                <div className="hamburger">
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
