import React from 'react'
import "../../styles/Participant.css";

const Participant = ({ participant, selectedParticipant, setSelectedParticipant }) => {
    const participantClickHandler = () => {
        if (selectedParticipant === participant) {
            setSelectedParticipant(null);
        } 
        else {
            setSelectedParticipant(participant);
        }
    }

    return (
        <div onClick={participantClickHandler} 
             className={participant === selectedParticipant ? "participant active" : "participant"}
        >
            <div className="existing_participant">{ participant.fullName }</div>
            <div className="existing_birthDate">{ participant.birthDate }</div>
        </div>
    )
}

export default Participant;