import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/participants"
});

export const getParticipantsRequest = async (id) => {
    return await axiosInstance.get(`/${id}`)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const createParticipantRequest = async (participant) => {
    return await axiosInstance.post("/create", participant)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const deleteParticipantRequest = async (participant) => {
    return await axiosInstance.post("/delete", participant)
        .then(response => response.data)
        .catch(e => { throw e });
}