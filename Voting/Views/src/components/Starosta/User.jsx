import React, { useEffect, useState } from 'react'
import "../../styles/User.css";

const User = ({ user, selectedUser, setSelectedUser }) => {
    const [status, setStatus] = useState("");
    const [dateString, setDateString] = useState("");

    useEffect(() => {
        if (user && user.sex) {
            if (user.sex == "м") {
                user.married == "0" ? setStatus("Не женат") : setStatus("Женат")
            }
            else {
                user.married == "0" ? setStatus("Не замужем") : setStatus("Замужем")
            }
        }

        if (user && user.birthDate) {
            if (user.birthDate.includes("-")) {
                const year = user.birthDate.substr(0, 4);
                const month = user.birthDate.substr(5, 2);
                const day = user.birthDate.substr(8, 2);

                return setDateString(`${day}.${month}.${year}`);
            }

            setDateString(user.birthDate);
        }
    }, [user]);

    const userClickHandler = () => {
        if (selectedUser === user) {
            setSelectedUser(null);
        } 
        else {
            setSelectedUser(user);
        }
    }

    return (
        <div onClick={userClickHandler} 
             className={user === selectedUser ? "user active" : "user"}
        >
            <div className="existing_role">{ user.role }</div>
            <div className="existing_fio">{ user.fullName }</div>
            <div className="existing_birth_date">{ dateString }</div>
            <div className="existing_login">{ user.login }</div>
            <div className="existing_password">{ user.password }</div>
            <div className="existing_sex">{ user.sex }</div>
            <div className="existing_married">{ status }</div>
        </div>
    )
}

export default User;