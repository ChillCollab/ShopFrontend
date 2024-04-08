import axios, {AxiosResponse} from "axios";
import config from "../../config.ts";

const adminReqs = {
    getUsers: () => {
        return axios.get(config.HOST + "/admin/users", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        } ).then((loginResponse: AxiosResponse<any>) => {
            return loginResponse
        })
    },
}

export default adminReqs;