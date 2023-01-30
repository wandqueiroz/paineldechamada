import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if (recoveredUser) {
            setUser(recoveredUser);
        }
        
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await createSession(email, password);

        //console.log("login auth", response.mensagem);

        const loggedUser = response.data.user;
        const token = response.data.token;
        const unidade = response.data.equipamento;
        
        localStorage.setItem("user", loggedUser);
        localStorage.setItem("token", token);
        localStorage.setItem("uni", unidade);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/");
        //return  response.mensagem;
    };

    const logout = () => {
        console.log("Logout!");

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}