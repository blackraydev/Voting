import React from 'react'
import "../../styles/Result.css";

const Voting = ({ result }) => {
    

    return (
        <tr className="result">
            <td className="existing_participant">{ result.fullName }</td>
            <td className="existing_birth_date">{ result.birthDate }</td>
            <td className="existing_votes">{ result.votes }</td>
            <td className="existing_average_mark">{ result.averageMark }</td>
        </tr>
    )
}

export default Voting;