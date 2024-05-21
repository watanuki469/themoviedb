import axiosMongo from "../axios/axiosUserMongo"

const fetchAllMongoUser = (page: any) => {
    return axiosMongo.get(`/api/users?page=${page}`)
}

const registerMongoApi = (displayName: any, email: any, password: any, confirmPassword: any) => {
    return axiosMongo.post("/api/user/signup", { displayName, email, password, confirmPassword })
}

const updateMongoPasswordApi = (email:any,password:any,newPassword:any,confirmNewPassword:any) => {
    return axiosMongo.put("/api/users", { email, password,newPassword,confirmNewPassword })
}

const deleteMongoUser = (id: any) => {
    return axiosMongo.delete(`/api/users/${id}`)
}
const loginMongoApi = (email: any, password: any) => {
    return axiosMongo.post(`/api/user/signin`, { email, password },
        {
            withCredentials: true,
        });
}

export { fetchAllMongoUser, registerMongoApi, updateMongoPasswordApi, deleteMongoUser, loginMongoApi }