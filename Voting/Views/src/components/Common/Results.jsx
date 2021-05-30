import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Result from "./Result";
import { getUsersRequest } from "../../services/usersServices";
import { getParticipantsRequest } from "../../services/participantsServices";
import { getCriteriasRequest } from "../../services/criteriasServices";
import { getVotesRequest } from "../../services/votesServices";
import "../../styles/Results.css";

const Results = () => {
    const votingId = localStorage.getItem("votingId");
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [targetStudents, setTargetStudents] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [votes, setVotes] = useState([]);
    const [results, setResults] = useState([]);
    const [targetCriterias, setTargetCriterias] = useState([]);
    const [selectedCriteriaId, setSelectedCriteriaId] = useState(0);

    useEffect(() => {
        getUsersRequest().then(usrs => setUsers(usrs));
        getParticipantsRequest(votingId).then(prtcpnts => setParticipants(prtcpnts));
        getCriteriasRequest().then(crtrs => setCriterias(crtrs));
        getVotesRequest().then(vts => setVotes(vts));
    }, []);

    useEffect(() => {
        if (users && participants) {
            const studentsId = participants.map(participant => participant.studentId);
            const filteredStudents = users.filter(user => studentsId.includes(user.id));
            setTargetStudents(filteredStudents);
        }
    }, [users, participants]);

    useEffect(() => {
        if (targetStudents && votes) {
            const tempResults = [];
            const targetVotes = votes.filter(vts => vts.votingId == votingId);

            targetStudents.forEach(student => {
                let voteSum = 0;
                let markSum = 0;

                targetVotes.forEach(vote => {
                    if (selectedCriteriaId == 0) {
                        if (vote.participantId == student.id && vote.deleted == 0) {
                            voteSum++;
                            markSum += vote.mark;
                        }
                    }
                    else {
                        if (vote.participantId == student.id && vote.deleted == 0 && vote.criteriaId == selectedCriteriaId) {
                            voteSum++;
                            markSum += vote.mark;
                        }
                    }
                    
                })

                let averageMark = (markSum / voteSum).toFixed(1);

                if (isNaN(averageMark)) {
                    averageMark = 0;
                }

                tempResults.push({
                    fullName: student.fullName,
                    birthDate: student.birthDate,
                    votes: voteSum,
                    averageMark: averageMark
                });
            })

            setResults(tempResults);
        }
    }, [targetStudents, votes, selectedCriteriaId]);

    useEffect(() => {
        const filteredCriterias = criterias.filter(criteria => criteria.votingId == votingId);
        setTargetCriterias(filteredCriterias);
    }, [criterias]);

    useEffect(() => {
        if (targetCriterias && targetCriterias[0] && targetCriterias[0].id !== 0) {
            const extendedCriterias = [ { id: 0, name: "Без критерия" }, ...targetCriterias];
            setTargetCriterias(extendedCriterias);
        }
    }, [targetCriterias]);

    const triggerDownload = (url, filename) => {
        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = filename;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const exportToExcel = () => {
        const table = document.querySelector(".results");
        const tableContent = table.outerHTML.replace(/ /g, "%20");
        const tableHTMLUrl = "data:application/vnd.ms-excel;charset=utf-8," + tableContent;
        
        triggerDownload(tableHTMLUrl, "results.xls");
    }

    return (
        <Layout>
            <div className="results_component">
                <div className="left_side">
                    <h1>Результаты</h1>
                    <table className="results">
                        <tr className="fields">
                            <th className="field_participant">Участница</th>
                            <th className="field_birth_date">Дата рождения</th>
                            <th className="field_votes">Голоса</th>
                            <th className="field_average_mark">Средняя оценка</th>
                        </tr>
                        <tbody className="list">
                            {
                                results.sort((a, b) => b.votes - a.votes)
                                       .map(result => 
                                    <Result result={result}
                                            key={result.id}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="right_side">
                    <h1>Критерий</h1>
                    <select className="selector" onChange={e => setSelectedCriteriaId(e.target.value)}>
                        {
                            targetCriterias.length ?
                                targetCriterias.map(criteria => 
                                    <option value={criteria.id}
                                            key={criteria.id}
                                            selected={criteria.id == 0}
                                    >
                                        { criteria.name }
                                    </option>)
                            : <option>Нет доступных критериев</option>
                        }
                    </select>
                    <button onClick={exportToExcel} className="export_to_excel">
                        Экспорт в Excel
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Results;