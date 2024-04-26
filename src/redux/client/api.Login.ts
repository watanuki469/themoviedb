import axiosUser from "../axiosUser"

const fetchAllUser = (page:any) => {
    return axiosUser.get(`/api/users?page=${page}`)
}

const postCreateUser = (name:any, job:any) => {
    return axiosUser.post("/api/users", {name, job})
}

const putUpdateUser = (name:any, job:any) => {
    return axiosUser.put("/api/users", {name, job})
}

const deleteUser = (id:any) => {
    return axiosUser.delete(`/api/users/${id}`)
}
const loginApi = (email:any, password:any) => {
    return axiosUser.post(`/api/login`,{email, password});
}

export {fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi};