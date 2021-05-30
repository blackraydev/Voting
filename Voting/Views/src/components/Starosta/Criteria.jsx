import React from 'react'
import "../../styles/Criteria.css";

const Student = ({ criteria, selectedCriteria, setSelectedCriteria }) => {
    const criteriaClickHandler = () => {
        if (selectedCriteria === criteria) {
            setSelectedCriteria(null);
        } 
        else {
            setSelectedCriteria(criteria);
        }
    }

    return (
        <div onClick={criteriaClickHandler} 
             className={criteria === selectedCriteria ? "criteria active" : "criteria"}
        >
            <div className="existing_criteria">{ criteria.name }</div>
        </div>
    )
}

export default Student;