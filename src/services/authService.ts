import {IAuth} from "../interfaces/authInterface";
import {IRes} from "../types/responseTypr";
import {IUser} from "../interfaces/userInterface";
import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const authService = {
    register(user:IAuth):IRes<IUser>{
        return apiService.post(urls.auth.register, user)
    }
}

export {
    authService
}