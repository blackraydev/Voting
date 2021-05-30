import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/users"
});

export const getUsersRequest = async () => {
    return await axiosInstance.get("/")
        .then(response => response.data)
        .catch(e => { throw e });
}

export const createUserRequest = async (user) => {
    return await axiosInstance.post("/create", user)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const editUserRequest = async (editedUser) => {
    return await axiosInstance.post("/edit", editedUser)
        .then(response => response.data)
        .catch(e => { throw e })
}

export const deleteUserRequest = async (id) => {
    return await axiosInstance.delete(`/${id}`)
        .then(response => response.data)
        .catch(e => { throw e });
}