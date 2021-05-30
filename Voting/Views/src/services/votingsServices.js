import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/votings"
});

export const getVotingsRequest = async () => {
    return await axiosInstance.get("/")
        .then(response => response.data)
        .catch(e => { throw e });
}

export const createVotingRequest = async (voting) => {
    return await axiosInstance.post("/create", voting)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const editVotingRequest = async (editedVoting) => {
    return await axiosInstance.post("/edit", editedVoting)
        .then(response => response.data)
        .catch(e => { throw e })
}

export const deleteVotingRequest = async (id) => {
    return await axiosInstance.delete(`/${id}`)
        .then(response => response.data)
        .catch(e => { throw e });
}