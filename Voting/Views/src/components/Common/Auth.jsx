import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { getUsersRequest } from "../../services/usersServices";
import "../../styles/Auth.css";

const Auth = () => {
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getUsersRequest()
            .then(usrs => setUsers(usrs));
    }, []);

    const loginHandler = () => {
        const user = users.find(usr => usr.login == login && usr.password == password);

        if (!user) {
            setPassword("");
            return setIsError(true);
        }

        setIsError(false);

        localStorage.setItem("role", user.role);
        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("userId", user.id);

        switch (user.role) {
            case "Староста":
                localStorage.setItem("starostaId", user.id);
                return history.push("/main");
            case "Студент":
                localStorage.setItem("studentId", user.id);

                if (user.sex == "м") {
                    localStorage.setItem("sex", "м");
                }
                else {
                    localStorage.setItem("sex", "ж");
                }
                
                return history.push("/main");
        }
    }

    return (
        <div className="auth">
            <div className="block">
                <div className="title">
                    <h1>Вход в систему</h1>
                </div>
                <div className="error_holder">
                    <p className={isError ? "error" : "error hidden"}>Пользователя не существует</p>
                </div>
                <div className="inputs">
                    <div className="input_holder">
                        <label>Логин</label>
                        <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин"/>
                    </div>
                    <div className="input_holder">
                        <label>Пароль</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль"/>
                    </div>
                </div>
                <button onClick={loginHandler} className="login">Вход</button>
            </div>
        </div>
    )
}

export default Auth;