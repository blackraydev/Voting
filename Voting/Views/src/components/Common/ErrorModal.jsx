import React from "react";
import "../../styles/ErrorModal.css";

const ErrorModal = ({ errorText, setOpenErrorModal }) => {
    return(
        <div className="error_modal">
            <div className="window">
                <h2>{ errorText }</h2>
                <button onClick={() => setOpenErrorModal(false)} className="close_modal">Закрыть</button>
            </div>
            <div className="overlay"/>
        </div>
    )
}

export default ErrorModal;