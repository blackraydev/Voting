import React, { useEffect, useState } from 'react';
import { editVotingRequest, getVotingsRequest } from '../../services/votingsServices';
import "../../styles/VotingsModal.css";

const VotingsModal = ({ setOpenEditModal, voting, setVotings, setSelectedVoting }) => {
    const [name, setName] = useState(voting.name);
    const [editEnabled, setEditEnabled] = useState(false);

    useEffect(() => isEmpty(), [name]);

    const isEmpty = () => {
        if (!name.trim()) {
            return setEditEnabled(true);
        }

        return setEditEnabled(false);
    }

    const editVotingHandler = () => {
        const editedVoting = { ...voting, name };

        return editVotingRequest(editedVoting)
            .then(() => {
                getVotingsRequest()
                    .then(vtngs => {
                        setVotings(vtngs);
                        setOpenEditModal(false);
                        setSelectedVoting(null);
                    });
            })
            .catch(e => console.log(e))
    }

    return(
        <div className="modal_votings">
            <div className="window">
                <div className="inputs">
                    <div className="input_holder">
                        <label>Название голосования</label>
                        <input value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder="Название голосования" 
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={editVotingHandler} 
                            className="edit_voting" 
                            disabled={editEnabled}
                    >
                        Редактировать название
                    </button>
                    <button onClick={() => setOpenEditModal(false)} 
                            className="cancel"
                    >
                        Отменить
                    </button>
                </div>
            </div>
            <div className="overlay"/>
        </div>
    )
}

export default VotingsModal;