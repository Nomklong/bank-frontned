import apiAxios from "./apiAxios";
import {AxiosResponse} from "axios";
import {UserType} from "../../shared/type/user.type";

export type LoginType = {
    email: string;
    password: string;
}

export type RegisterType = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export function login(parameters: LoginType): Promise<AxiosResponse<UserType>> {
    //TODO wait implement get url from .env
    return apiAxios.post('/login', parameters);
}

export function register(parameters: RegisterType): Promise<AxiosResponse<UserType>> {
    //TODO wait implement get url from .env
    return apiAxios.post('/register', parameters);
}
