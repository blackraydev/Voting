import React, { useEffect, useState } from "react";
import { getVotingsRequest, createVotingRequest, deleteVotingRequest } from "../../services/votingsServices";
import { getCriteriasRequest, createCriteriaRequest, deleteCriteriaRequest } from "../../services/criteriasServices";
import Layout from "../Common/Layout";
import Voting from "./Voting";
import Criteria from "./Criteria";
import VotingsModal from "./VotingsModal";
import "../../styles/Votings.css";
import CriteriaModal from "./CriteriaModal";
import ErrorModal from "../Common/ErrorModal";

const Votings = () => {
    const [votings, setVotings] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [targetCriterias, setTargetCriterias] = useState([]);
    const [votingName, setVotingName] = useState("");
    const [criteriaName, setCriteriaName] = useState("");
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [selectedCriteria, setSelectedCriteria] = useState(null);
    const [createEnabled, setCreateEnabled] = useState(false);
    const [createCriteriaEnabled, setCreateCriteriaEnabled] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openEditCriteriaModal, setOpenEditCriteriaModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openErrorCriteriaModal, setOpenErrorCriteriaModal] = useState(false);

    useEffect(() => {
        getVotingsRequest().then(vtngs => setVotings(vtngs));
        getCriteriasRequest().then(crtrs => setCriterias(crtrs));
    }, []);

    useEffect(() => isEmpty(), [votingName]);

    useEffect(() => isCriteriaEmpty(), [criteriaName, selectedVoting]);

    useEffect(() => {
        if (selectedVoting && selectedVoting.id) {
            const filteredCriterias = criterias.filter(crtr => crtr.votingId == selectedVoting.id);
            setSelectedCriteria(null);
            setTargetCriterias(filteredCriterias);
        }
        else {
            setTargetCriterias([]);
        }
    }, [selectedVoting, criterias]);

    const isEmpty = () => {
        if (!votingName.trim()) {
            return setCreateEnabled(true);
        }

        return setCreateEnabled(false);
    }

    const isCriteriaEmpty = () => {
        if (!criteriaName.trim() || !selectedVoting) {
            return setCreateCriteriaEnabled(true);
        }

        return setCreateCriteriaEnabled(false);
    }

    const createVotingHandler = () => {
        const voting = { name: votingName };

        const error = votings.some(vtng => vtng.name === votingName);

        if (error) {
            clearInputs();
            return setOpenErrorModal(true);
        }

        return createVotingRequest(voting)
            .then(() => {
                clearInputs();
                getVotingsRequest()
                    .then(vtngs => setVotings(vtngs));
            })
            .catch(e => console.log(e));
    }

    const deleteVotingHandler = () => {
        const votingId = selectedVoting.id;

        return deleteVotingRequest(votingId)
            .then(() => {
                setSelectedVoting(null);
                getVotingsRequest()
                    .then(vtngs => setVotings(vtngs));
            })
            .catch(e => { throw e });
    }

    const createCriteriaHandler = () => {
        const criteria = { votingId: selectedVoting.id, name: criteriaName };

        const error = criterias.some(crtr => crtr.name === criteriaName && crtr.votingId == selectedVoting.id);

        if (error) {
            clearInputs();
            return setOpenErrorCriteriaModal(true);
        }

        return createCriteriaRequest(criteria)
            .then(() => {
                clearInputs();
                getCriteriasRequest()
                    .then(crtrs => setCriterias(crtrs));
            })
            .catch(e => console.log(e));
    }

    const deleteCriteriaHandler = () => {
        const criteriaId = selectedCriteria.id;

        return deleteCriteriaRequest(criteriaId)
            .then(() => {
                setSelectedCriteria(null);
                getCriteriasRequest()
                    .then(crtrs => setCriterias(crtrs));
            })
            .catch(e => { throw e });
    }

    const clearInputs = () => {
        setVotingName("");
        setCriteriaName("");
    }

    return (
        <Layout>
            {
                openEditModal ? <VotingsModal setOpenEditModal={setOpenEditModal} 
                                              voting={selectedVoting}
                                              setVotings={setVotings}
                                              setSelectedVoting={setSelectedVoting}
                                /> : null 
            }
            {
                openEditCriteriaModal ? <CriteriaModal setOpenEditCriteriaModal={setOpenEditCriteriaModal} 
                                              criteria={selectedCriteria}
                                              setCriterias={setCriterias}
                                              setSelectedCriteria={setSelectedCriteria}
                                        /> : null 
            }
            { 
                openErrorModal ? <ErrorModal errorText="Голосование с таким названием уже существует!"
                                             setOpenErrorModal={setOpenErrorModal}
                                 /> : null 
            }
            { 
                openErrorCriteriaModal ? <ErrorModal errorText="Критерий с таким названием уже существует!"
                                             setOpenErrorModal={setOpenErrorCriteriaModal}
                                         /> : null 
            }
            <div className="votings_component">
                <div className="top_part">
                    <div className="left_side">
                        <h1>Голосование</h1>
                        <div className="votings">
                            <div className="fields">
                                <div className="field_voting_name">Название</div>
                            </div>
                            <div className="list">
                                { 
                                    votings.map(voting => 
                                        <Voting voting={voting}
                                                selectedVoting={selectedVoting}
                                                setSelectedVoting={setSelectedVoting}
                                                key={voting.id}
                                        />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="middle_side">
                        <h1>Критерии</h1>
                        <div className="criterias">
                            <div className="fields">
                                <div className="field_criteria">Критерий</div>
                            </div>
                            <div className="list">
                                {
                                    targetCriterias.map(criteria => 
                                        <Criteria criteria={criteria}
                                                  selectedCriteria={selectedCriteria}
                                                  setSelectedCriteria={setSelectedCriteria}
                                                  key={criteria.id}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom_part">
                    <div className="right_side">
                        <div className="voting_handler">
                            <h1>Добавить голосование</h1>
                            <input onChange={e => setVotingName(e.target.value)} 
                                value={votingName}
                                className="votingName" 
                                placeholder="Название голосования"
                            />
                            <button onClick={createVotingHandler} 
                                    disabled={createEnabled} 
                                    className="add_voting"
                            >
                                Добавить голосование
                            </button>
                            <button onClick={() => setOpenEditModal(true)} 
                                    disabled={selectedVoting === null ? true : false} 
                                    className="edit_voting"
                            >
                                Редактировать голосование
                            </button>
                            <button onClick={deleteVotingHandler} 
                                    disabled={selectedVoting === null ? true : false} 
                                    className="remove_voting"
                            >
                                Удалить голосование
                            </button>
                        </div>
                        <div className="voting_handler">
                            <h1>Добавить критерий</h1>
                            <input onChange={e => setCriteriaName(e.target.value)} 
                                value={criteriaName}
                                className="criteriaName" 
                                placeholder="Название критерия"
                            />
                            <button onClick={createCriteriaHandler} 
                                    disabled={createCriteriaEnabled} 
                                    className="add_criteria"
                            >
                                Добавить критерий
                            </button>
                            <button onClick={() => setOpenEditCriteriaModal(true)} 
                                    disabled={selectedCriteria === null ? true : false} 
                                    className="edit_voting"
                            >
                                Редактировать критерий
                            </button>
                            <button onClick={deleteCriteriaHandler} 
                                    disabled={selectedCriteria === null ? true : false} 
                                    className="remove_voting"
                            >
                                Удалить критерий
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Votings;