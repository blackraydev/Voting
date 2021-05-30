import React, { useEffect, useState } from 'react';
import { editCriteriaRequest, getCriteriasRequest } from '../../services/criteriasServices';
import "../../styles/CriteriaModal.css";

const CriteriaModal = ({ setOpenEditCriteriaModal, criteria, setCriterias, setSelectedCriteria }) => {
    const [name, setName] = useState(criteria.name);
    const [editEnabled, setEditEnabled] = useState(false);

    useEffect(() => isEmpty(), [name]);

    const isEmpty = () => {
        if (!name.trim()) {
            return setEditEnabled(true);
        }

        return setEditEnabled(false);
    }

    const editCriteriaHandler = () => {
        const editedCriteria = { ...criteria, name };

        return editCriteriaRequest(editedCriteria)
            .then(() => {
                getCriteriasRequest()
                    .then(crtrs => {
                        setCriterias(crtrs);
                        setOpenEditCriteriaModal(false);
                        setSelectedCriteria(null);
                    });
            })
            .catch(e => console.log(e))
    }

    return(
        <div className="modal_criteria">
            <div className="window">
                <div className="inputs">
                    <div className="input_holder">
                        <label>Название критерия</label>
                        <input value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder="Название критерия" 
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={editCriteriaHandler} 
                            className="edit_criteria" 
                            disabled={editEnabled}
                    >
                        Редактировать название
                    </button>
                    <button onClick={() => setOpenEditCriteriaModal(false)} 
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

export default CriteriaModal;