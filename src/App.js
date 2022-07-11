import React, {useEffect, useState} from "react";
import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false); // создаем зависимость, авторизован ли пользователь
    const [isLoading, setIsLoading] = useState(true); // создаем зависимость, загрузки страницы


    // при первом запуске проверяем, авторизован ли пользователь
    useEffect(() => {
        if (localStorage.getItem('auth'))
            setIsAuth(true);
        setIsLoading(false);
    }, [])


    return (
        // оборачиваем все в наш контекст (глобальное хранилище
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth: setIsAuth, // можно так и так
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>

                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
