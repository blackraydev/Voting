import React, { useEffect, useState } from "react";
import { getVotingsRequest } from "../../services/votingsServices";
import { getUsersRequest } from "../../services/usersServices";
import Layout from "../Common/Layout";
import Participant from "../Starosta/Participant";
import "../../styles/Participants.css";
import { createParticipantRequest, deleteParticipantRequest, getParticipantsRequest } from "../../services/participantsServices";

const Participants = () => {
    const votingId = localStorage.getItem("votingId");
    const [votings, setVotings] = useState([]);
    const [voting, setVoting] = useState(null);
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentsLeft, setStudentsLeft] = useState([]);
    const [studentsRight, setStudentsRight] = useState([]);
    const [selectedStudentLeft, setSelectedStudentLeft] = useState(null);
    const [selectedStudentRight, setSelectedStudentRight] = useState(null);
    const [addEnabled, setAddEnabled] = useState(true);
    const [removeEnabled, setRemoveEnabled] = useState(true);

    useEffect(() => {
        getVotingsRequest().then(vtngs => setVotings(vtngs));
        getUsersRequest().then(usrs => setUsers(usrs));
        getParticipantsRequest(votingId).then(prtcpnts => setParticipants(prtcpnts));
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
            setStudents(femaleStudents);
        }
    }, [users]);

    useEffect(() => {
        if (students && participants) {
            const participantsId = participants.map(prtcpnt => prtcpnt.studentId);
            const filteredStudents = students.filter(stdnt => participantsId.includes(stdnt.id));
            setStudentsLeft(filteredStudents);
        }
    }, [students, participants]);

    useEffect(() => {
        if (studentsLeft) {
            const participantsId = participants.map(prtcpnt => prtcpnt.studentId);
            const filteredStudents = students.filter(stdnt => !participantsId.includes(stdnt.id));
            setStudentsRight(filteredStudents);
        }
    }, [studentsLeft]);

    useEffect(() => {
        if (selectedStudentRight) {
            return setAddEnabled(false);
        }

        return setAddEnabled(true);
    }, [selectedStudentRight]);

    useEffect(() => {
        if (selectedStudentLeft) {
            return setRemoveEnabled(false);
        }

        return setRemoveEnabled(true);
    }, [selectedStudentLeft]);

    const addParticipantHandler = () => {
        const participant = { votingId, studentId: selectedStudentRight.id, assignDate: new Date() };

        return createParticipantRequest(participant)
            .then(() => {
                setSelectedStudentRight(null);
                getUsersRequest().then(usrs => setUsers(usrs));
                getParticipantsRequest(votingId).then(prtcpnts => setParticipants(prtcpnts));
            })
            .catch(e => console.log(e));
    }

    const removeParticipantHandler = () => {
        const participant = { votingId, studentId: selectedStudentLeft.id, assignDate: new Date() }; 

        return deleteParticipantRequest(participant)
            .then(() => {
                setSelectedStudentLeft(null);
                getUsersRequest().then(usrs => setUsers(usrs));
                getParticipantsRequest(votingId).then(prtcpnts => setParticipants(prtcpnts));
            })
            .catch(e => console.log(e));
    }

    return (
        <Layout>
            <div className="participants_component">
                <div className="left_side">
                    <h1>{ voting && voting.name }</h1>
                    <div className="participants">
                        <div className="fields">
                            <div className="field_participant">Участница</div>
                            <div className="field_birth_date">Дата рождения</div>
                        </div>
                        <div className="list">
                            { 
                                studentsLeft.map(student => 
                                    <Participant participant={student}
                                                 selectedParticipant={selectedStudentLeft}
                                                 setSelectedParticipant={setSelectedStudentLeft}
                                                 key={student.id}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className="middle_side">
                    <button onClick={addParticipantHandler} 
                            disabled={addEnabled} 
                            className="add_participant"
                    >
                        {` < `}
                    </button>
                    <button onClick={removeParticipantHandler} 
                            disabled={removeEnabled} 
                            className="remove_participant"
                    >
                        {` > `}
                    </button>
                </div>
                <div className="right_side">
                    <h1>Добавить участниц</h1>
                    <div className="participants">
                        <div className="fields">
                            <div className="field_participant">Участница</div>
                            <div className="field_birth_date">Дата рождения</div>
                        </div>
                        <div className="list">
                            { 
                                studentsRight.map(student => 
                                    <Participant participant={student}
                                                 selectedParticipant={selectedStudentRight}
                                                 setSelectedParticipant={setSelectedStudentRight}
                                                 key={student.id}
                                    />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Participants;