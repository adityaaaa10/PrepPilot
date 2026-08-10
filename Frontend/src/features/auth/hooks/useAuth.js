import { useState } from "react";
import { useNavigate } from "react-router";
import { register, login, logout } from "../services/auth.api";

export function useAuth(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        const { username, email, password, confirmPassword } = formData;

        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError(null);
        try{
            const data = await register({ username, email, password });
            navigate("/dashboard");
            return data;
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }finally{
            setLoading(false);
        }
    }

    const handleLogin = async (formData) => {
        const { email, password } = formData;

        setLoading(true);
        setError(null);
        try{
            const data = await login({ email, password });
            navigate("/dashboard");
            return data;
        }catch(err){
            setError(err.response?.data?.message || "Login failed");
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try{
            await logout();
            navigate("/login");
        }catch(err){
            setError(err.response?.data?.message || "Logout failed");
        }finally{
            setLoading(false);
        }
    }

    return { handleRegister, handleLogin, handleLogout, loading, error };
}