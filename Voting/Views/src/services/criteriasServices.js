import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/criterias"
});

export const getCriteriasRequest = async () => {
    return await axiosInstance.get("/")
        .then(response => response.data)
        .catch(e => { throw e });
}

export const createCriteriaRequest = async (criteria) => {
    return await axiosInstance.post("/create", criteria)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const editCriteriaRequest = async (editedCriteria) => {
    return await axiosInstance.post("/edit", editedCriteria)
        .then(response => response.data)
        .catch(e => { throw e })
}

export const deleteCriteriaRequest = async (id) => {
    return await axiosInstance.delete(`/${id}`)
        .then(response => response.data)
        .catch(e => { throw e });
}