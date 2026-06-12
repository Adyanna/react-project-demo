import { useNavigate } from "react-router";
import { useState } from "react";
import { LoginForm } from "@features/auth/components/login-form/login-form";
import { loginUser } from "@features/auth/services/auth.service";

const LoginPage = () => {

    const navegate = useNavigate();
    const [error,setError]=useState("");

    const handleLogin = async (email: string, password: string,remember:boolean) => {
        setError("");
        try {
            const token = await loginUser(email, password);
            console.log('TOKEN SERVICIO:',remember,' - ', token,)
            if(remember){
                localStorage.setItem("token", token);
            }
            else
            {
                sessionStorage.setItem('token',token)
            }
            navegate("/products");
        } catch (error: unknown) {
            setError('Usuario o contraseña incorrectos');
            throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
        }
    };

    return <LoginForm onLogin={handleLogin} error={error}/>;
};

export default LoginPage