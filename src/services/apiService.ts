import axios, {AxiosError} from "axios";
import {baseURL, urls} from "../constants/urls";
import {authService} from "./authService";
import {router} from "../routes/router";

let isRefreshing = false;
type IWaitlist = () => void
const waitList: IWaitlist[] = [];

const apiService = axios.create({baseURL});

apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req;
});

apiService.interceptors.response.use(
    res => {
        return res;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            if (!isRefreshing){
                isRefreshing = true
                try {
                    await authService.refresh()
                    runAfterRefresh()
                    isRefreshing = false
                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteToken()
                    isRefreshing = false
                    router.navigate('/login?SessionExpired=true');
                    return Promise.reject(error);
                }
            }

            if (originalRequest.url === urls.auth.refresh){
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(apiService(originalRequest))
                })
            })
        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb: IWaitlist): void => {
    waitList.push(cb)
    }

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb();
    }
}

export {
    apiService
}