import React, { useEffect, useState } from 'react';
import { getUsersRequest } from "../../services/usersServices";
import { getCriteriasRequest } from "../../services/criteriasServices";
import { getVotesRequest, removeVoteRequest } from "../../services/votesServices";
import "../../styles/VoteModal.css";

const VoteModal = ({ voting, setOpenModal }) => {
    const userId = localStorage.getItem("userId");
    const [users, setUsers] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [votes, setVotes] = useState([]);

    const [targetVote, setTargetVote] = useState(null);
    const [targetCriteria, setTargetCritera] = useState(null);
    const [targetParticipant, setTargetParticipant] = useState(null);

    const [voteDeleted, setVoteDeleted] = useState(true);

    useEffect(() => {
        getUsersRequest().then(usrs => setUsers(usrs));
        getCriteriasRequest().then(crtrs => setCriterias(crtrs));
        getVotesRequest().then(vts => setVotes(vts));
    }, []);

    useEffect(() => {
        if (votes) {
            setTargetVote(votes.find(vote => vote.studentId == userId && vote.votingId == voting.id));
        }
    }, [votes]);

    useEffect(() => {
        if (targetVote && criterias) {
            setTargetCritera(criterias.find(criteria => criteria.id == targetVote.criteriaId));
        }
    }, [targetVote, criterias]);

    useEffect(() => {
        if (targetVote && users) {
            setTargetParticipant(users.find(user => user.id == targetVote.participantId));
        }
    }, [targetVote, users]);

    useEffect(() => {
        if (targetVote) {
            if (targetVote.deleted) {
                return setVoteDeleted(true);
            }

            return setVoteDeleted(false);
        }
    }, [targetVote]);

    const deleteVoteHandler = () => {
        const removedVote = { ...targetVote, deleted: 1 };

        return removeVoteRequest(removedVote)
            .then(() => {
                setVoteDeleted(true);
            })
    }

    return (
        <div className="modal_vote">
            <div className="window">
                <h2>{ voting.name }</h2>
                <h2>{ targetCriteria && targetCriteria.name } - { targetVote && targetVote.mark }</h2>
                <h2>{ targetParticipant && targetParticipant.fullName }</h2>
                <div className="buttons_holder">
                    <button onClick={deleteVoteHandler} 
                            className="edit_user" 
                            disabled={voteDeleted}
                    >
                        { voteDeleted ? "Голос удален" : "Удалить голос" }
                    </button>
                    <button onClick={() => setOpenModal(false)} 
                            className="cancel"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
            <div className="overlay"/>
        </div>
    )
}

export default VoteModal;
