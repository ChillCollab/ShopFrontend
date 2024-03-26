import axios, {AxiosResponse} from "axios";
import config from "../../config.ts";

export interface LoginResponse {
    user: {
        id: number
        login: string
        name: string
        surname: string
        email: string
        active: boolean
        created: string
        updated: string
    }
    access_token: string
    refresh_token: string
}
const authRequests = {
    register: (login: string, name: string, surname: string, email: string) => {
        return axios.post(config.HOST + "/auth/register", {
            login: login,
            name: name,
            surname: surname,
            email: email
        }).then((loginResponse: AxiosResponse<any>) => {
            return loginResponse
        })
    },
    sendMail: (email: string) => {
        return axios.post(config.HOST + "/auth/activate/send", {
            email: email
        }).then((loginResponse: AxiosResponse<any>) => {
            return loginResponse
        })
    },
    recovery: (email: string) => {
        return axios.post(config.HOST + "/auth/recovery", {
            email: email
        }).then((loginResponse: AxiosResponse<any>) => {
            return loginResponse
        })
    },
    login: (login: string, password: string) => {
           return axios.post(config.HOST + "/auth/login", {
               email: login,
               password: password
           }).then((loginResponse: AxiosResponse<LoginResponse>) => {
               return loginResponse
           }).catch(e => {
               console.error(e)
               return e
           })
    },
    logout: () => {
        return axios.post(config.HOST + "/auth/logout", {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        }).then((logoutResponse: AxiosResponse<any>) => {
            return logoutResponse
        }).catch(e => {
            console.error(e)
            return e
        })
    },
    userInfo: () => {
            return axios.get(config.HOST + "/user/info", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                }
            })
                .then((infoResponse: AxiosResponse<LoginResponse>) => {
                return infoResponse
            }).catch(e => {
                    console.error(e)
                    return e
                })
    },
    refreshToken: () => {
        try {
            return axios.post(config.HOST + "/auth/refresh",{
                token: localStorage.getItem("refresh_token")
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                }
            })
                .then((infoResponse: AxiosResponse<LoginResponse>) => {
                    return infoResponse
                })
        } catch (e) {
            throw new Error(`${e}`)

        }
    }
}

export default authRequests