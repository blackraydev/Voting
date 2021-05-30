import React from "react";
import { CSSTransition } from "react-transition-group";
import "../../styles/Layout.css";
import "../../styles/anim.css";

const Layout = ({ children }) => {
    return (
        <CSSTransition in appear timeout={1000} classNames="anim-layout">
            <div className="layout">
                { children }
            </div>
        </CSSTransition>
    )
}

export default Layout;