import {axiosInstance} from "../axiosInstance.ts";

export const logsReqs = {
    getLogs : () => {
        return axiosInstance.get('/admin/actions/list');
    },
}