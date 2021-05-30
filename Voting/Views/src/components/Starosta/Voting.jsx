import React from 'react'
import "../../styles/Voting.css";

const Voting = ({ voting, selectedVoting, setSelectedVoting }) => {
    const votingClickHandler = () => {
        if (selectedVoting === voting) {
            setSelectedVoting(null);
        } 
        else {
            setSelectedVoting(voting);
        }
    }

    return (
        <div onClick={votingClickHandler} 
             className={voting === selectedVoting ? "voting active" : "voting"}
        >
            <div className="existing_voting">{ voting.name }</div>
        </div>
    )
}

export default Voting;