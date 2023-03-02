import { LoginResponse, RegisterResponse } from '../types/auth';
import {covergenFetch} from './base';
import {AUTH_TOKEN_KEY} from "../constants/base";

export async function login(email: string, password: string): Promise<LoginResponse> {
    return covergenFetch<LoginResponse>('user/login', 'POST', {
        body: {
            email: email,
            password: password
        }
    }).then(result => {
        localStorage.setItem(AUTH_TOKEN_KEY, result.token)
        localStorage.setItem('user', JSON.stringify(result))
        return result
    });
}

export async function register(username: string, email: string, password: string): Promise<RegisterResponse> {
    return covergenFetch<LoginResponse>('user/register', 'POST', {
        body: {
            username: username,
            email: email,
            password: password,
        }
    }).then(result => {
        localStorage.setItem(AUTH_TOKEN_KEY, result.token)
        return result
    });
}