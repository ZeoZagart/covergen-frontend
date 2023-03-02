export interface LoginResponse {
    token: string,
    success: boolean,
    error: string,
    email: string,
    username: string
}

export interface RegisterResponse {
    token: string,
    success: boolean,
    error: string
    email: string,
    username: string
}