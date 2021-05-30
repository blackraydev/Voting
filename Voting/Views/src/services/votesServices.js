import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/votes"
});

export const getVotesRequest = async () => {
    return await axiosInstance.get("/")
        .then(response => response.data)
        .catch(e => { throw e });
}

export const createVoteRequest = async (vote) => {
    return await axiosInstance.post("/create", vote)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const removeVoteRequest = async (removedVote) => {
    return await axiosInstance.post("/edit", removedVote)
        .then(response => response.data)
        .catch(e => { throw e })
}