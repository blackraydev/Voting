import React, { useEffect, useState } from "react";
import { getVotingsRequest } from "../../services/votingsServices";
import { getVotesRequest } from "../../services/votesServices";
import Layout from "./Layout";
import Voting from "../Starosta/Voting";
import "../../styles/Main.css";
import { useHistory } from "react-router";
import VoteModal from "./VoteModal";

const Main = () => {
    const userId = localStorage.getItem("userId");
    const sex = localStorage.getItem("sex");
    const [votings, setVotings] = useState([]);
    const [votes, setVotes] = useState([]);
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [voteDisabled, setVoteDisabled] = useState(false);
    const [openVoteModal, setOpenVoteModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getVotingsRequest().then(vtngs => setVotings(vtngs));
        getVotesRequest().then(vts => setVotes(vts));
    }, []);

    useEffect(() => {
        if (votes && selectedVoting) {
            const targetVote = votes.find(vts => vts.studentId == userId && selectedVoting.id == vts.votingId);

            if (targetVote) {
                setVoteDisabled(true);
            }
            else {
                setVoteDisabled(false);
            }
        }
    }, [votes, selectedVoting]);

    const redirectToLink = (address) => {
        const votingId = selectedVoting.id;
        localStorage.setItem("votingId", votingId);
        history.push(`/main/${votingId}/${address}`)
    }

    const goToParticipants = () => redirectToLink("participants");

    const goToVotes = () => redirectToLink("vote");

    const goToResults = () => redirectToLink("results");

    return (
        <Layout>
            { 
                openVoteModal ? 
                    <VoteModal voting={selectedVoting} 
                               setOpenModal={setOpenVoteModal} 
                    /> : null 
            }
            <div className="main_component">
                <div className="left_side">
                    <h1>??????????????????????</h1>
                    <div className="votings">
                        <div className="fields">
                            <div className="field_subject_name">???????????????? ????????????????</div>
                        </div>
                        <div className="list">
                            { 
                                votings.map(voting => 
                                    <Voting  voting={voting}
                                             selectedVoting={selectedVoting}
                                             setSelectedVoting={setSelectedVoting}
                                             key={voting.id}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className="right_side">
                    <h1>????????????????</h1>
                    
                    <div className="buttons_handler">
                        <button onClick={goToResults} 
                                disabled={selectedVoting === null ? true : false} 
                                className="results"
                        >
                            ????????????????????
                        </button>
                        {
                            !sex ? 
                                <button onClick={goToParticipants} 
                                        disabled={selectedVoting === null ? true : false} 
                                        className="participants"
                                >
                                    ??????????????????
                                </button>
                            : null
                        }
                        {
                            !sex || sex == "??" ?
                                <button onClick={() => setOpenVoteModal(true)} 
                                        disabled={selectedVoting === null || !voteDisabled ? true : false} 
                                        className="my_vote"
                                >
                                    ?????? ??????????
                                </button>
                            : null
                        }
                        {
                            !sex || sex == "??" ?
                                <button onClick={goToVotes} 
                                        disabled={selectedVoting === null || voteDisabled ? true : false} 
                                        className="my_vote"
                                >
                                    ??????????????????????????
                                </button>
                            : null
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Main;