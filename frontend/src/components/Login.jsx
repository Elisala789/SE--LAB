import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import "./Login.css"; // Import custom styles

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email.endsWith("@nitc.ac.in")) {
            alert("Only NITC Emails are allowed!!!!!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", {
                email: email,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                const role = response.data.role;
                if (role === "STUDENT") {
                    window.location.href = "/student-dashboard";
                } else if (role === "FACULTY") {
                    window.location.href = "/faculty-dashboard";
                } else if (role === "RESEARCHER") {
                    window.location.href = "/researcher-dashboard";
                } else if (role === "GENERALADMIN") {
                    window.location.href = "/generaladmin-dashboard";
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    // Redirect to backend OAuth login
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
    };

    return (
        <div className="login-container bg-green-100">
            <div className="p-5 shadow-lg rounded bg-white login-card">
                <h2 className="text-center mb-4 text-primary">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <a href="#" className="text-danger">
                            Forgot Password?
                        </a>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <div className="text-center mt-3">
                    <button onClick={handleGoogleLogin} className="btn btn-light border w-100 d-flex align-items-center justify-content-center">
                        <FcGoogle size={24} className="me-2" /> Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
