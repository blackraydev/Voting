import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const CustomLink = ({ link, text, tabName, setTabName, logout }) => {
    const index = link.lastIndexOf("/");
    const activeTabName = link.substr(index);

    const actionHandler = () => {
        if (logout) {
            localStorage.removeItem("role");
            localStorage.removeItem("starostaId");
            localStorage.removeItem("studentId");
            localStorage.removeItem("sex");
        }

        setTabName(link);
    }

    return(
        <Link onClick={actionHandler} to={link}>
            <div className={tabName == link || tabName == activeTabName ? "link active" : "link"}>
                {text}
            </div>
        </Link>
    )
}

const Navbar = () => {
    const role = localStorage.getItem("role");
    const href = window.location.href;
    const index = href.lastIndexOf("/");
    const [tabName, setTabName] = useState(href.substr(index));

    const renderStarostaPart = () => {
        return(
            <>
                <CustomLink link="/main" text="Главная" tabName={tabName} setTabName={setTabName} />
                <CustomLink link="/main/starosta/votings" text="Голосование" tabName={tabName} setTabName={setTabName} />
                <CustomLink link="/main/starosta/users" text="Пользователи" tabName={tabName} setTabName={setTabName} />
            </>
        )
    }

    const renderStudentPart = () => {
        return(
            <>
                <CustomLink link="/main" text="Главная" tabName={tabName} setTabName={setTabName} />
            </>
        )
    }

    return(
        <div className="navbar">
            <div className="left_side">
                { role == "Староста" ? renderStarostaPart() : null }
                { role == "Студент" ? renderStudentPart() : null }
            </div>
            <div className="right_side">
                <CustomLink link="/" text="Выход" tabName={tabName} setTabName={setTabName} logout/>
            </div>
        </div>
    )
}

export default Navbar;