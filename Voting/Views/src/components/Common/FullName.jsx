import React from 'react'
import "../../styles/FullName.css";

const FullName = () => {
    const fullName = localStorage.getItem("fullName");

    return (
        <div className="fullName_component">
            <h2>{ fullName }</h2>
        </div>
    )
}

export default FullName
