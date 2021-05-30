import React, { useEffect, useState } from "react";
import { getVotingsRequest } from "../../services/votingsServices";
import { getUsersRequest } from "../../services/usersServices";
import { getParticipantsRequest } from "../../services/participantsServices";
import { getCriteriasRequest } from "../../services/criteriasServices";
import { createVoteRequest } from "../../services/votesServices";
import Layout from "./Layout";
import Participant from "../Starosta/Participant";
import "../../styles/Vote.css";
import { useHistory } from "react-router";

const Main = () => {
    const votingId = localStorage.getItem("votingId");
    const userId = localStorage.getItem("userId");
    const [users, setUsers] = useState([]);
    const [votings, setVotings] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [femaleStudents, setFemaleStudents] = useState([]);
    const [targetStudents, setTargetStudents] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [targetCriterias, setTargetCriterias] = useState([]);
    const [voting, setVoting] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCriteriaId, setSelectedCriteriaId] = useState(0);
    const [selectedMark, setSelectedMark] = useState(0);
    const [voteEnabled, setVoteEnabled] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getVotingsRequest().then(vtngs => setVotings(vtngs));
        getUsersRequest().then(usrs => setUsers(usrs));
        getParticipantsRequest(votingId).then(prtcpnts => setParticipants(prtcpnts));
        getCriteriasRequest().then(crtrs => setCriterias(crtrs));
    }, []);

    useEffect(() => {
        if (votings) {
            const targetVoting = votings.find(vtng => vtng.id == votingId);
            setVoting(targetVoting);
        }
    }, [votings]);

    useEffect(() => {
        if (users) {
            const femaleStudents = users.filter(user => user.role == "Студент" && user.sex == "ж");
            setFemaleStudents(femaleStudents);
        }
    }, [users]);

    useEffect(() => {
        if (femaleStudents && participants) {
            const participantsId = participants.map(prtcpnt => prtcpnt.studentId);
            const filteredStudents = femaleStudents.filter(stdnt => participantsId.includes(stdnt.id));
            setTargetStudents(filteredStudents);
        }
    }, [femaleStudents, participants]);

    useEffect(() => {
        if (criterias) {
            const filteredCriterias = criterias.filter(crtr => crtr.votingId == votingId);
            setTargetCriterias(filteredCriterias);
        }
    }, [criterias]);

    useEffect(() => {
        if (!targetCriterias.length || !selectedStudent) {
            return setVoteEnabled(true);
        }

        return setVoteEnabled(false);
    }, [targetCriterias, selectedStudent]);

    useEffect(() => {
        if (targetCriterias && targetCriterias[0] && targetCriterias[0].id) {
            setSelectedCriteriaId(targetCriterias[0].id);
        }
    }, [targetCriterias]);

    const voteHandler = () => {
        const studentId = userId;
        const participantId = selectedStudent.id;
        const criteriaId = selectedCriteriaId;
        const mark = selectedMark;

        const newVote = { studentId, participantId, votingId, criteriaId, mark, voteDate: new Date(), deleted: 0 };

        return createVoteRequest(newVote)
            .then(() => {
                history.push("/main");
            })
    }

    return (
        <Layout>
            <div className="vote_component">
                <div className="top_part">
                    <h1>Участницы</h1>
                    <div className="vote">
                        <div className="fields">
                            <div className="field_participant">Участница</div>
                            <div className="field_birth_date">Дата рождения</div>
                        </div>
                        <div className="list">
                            { 
                                targetStudents.map(student => 
                                    <Participant participant={student}
                                                 selectedParticipant={selectedStudent}
                                                 setSelectedParticipant={setSelectedStudent}
                                                 key={student.id}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className="bottom_part">
                    <h1>Критерий и оценка</h1>
                    <select className="selector" onChange={e => setSelectedCriteriaId(e.target.value)}>
                        {
                            targetCriterias.length ?
                                targetCriterias.map(criteria => 
                                    <option value={criteria.id}
                                            key={criteria.id}
                                    >
                                        { criteria.name }
                                    </option>)
                            : <option>Нет доступных критериев</option>
                        }
                    </select>
                    <select className="selector" onChange={e => setSelectedMark(e.target.value)}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elem => 
                                <option value={elem} selected={elem == 1}> { elem } </option>
                            )
                        }
                    </select>
                    <button onClick={voteHandler} 
                            disabled={voteEnabled} 
                            className="vote_for"
                    >
                        Проголосовать
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Main;