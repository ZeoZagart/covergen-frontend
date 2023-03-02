import {AUTH_TOKEN_KEY, COVERGEN_URL} from "../constants/base";

export interface CovergenFetchRequest {
    body?: {},
    headers?: {}
}

export async function covergenFetch<T>(endpoint: string, method: string = 'GET', params: CovergenFetchRequest = {body: undefined, headers: {}}): Promise<T> {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const url = `${COVERGEN_URL}/${endpoint}`
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...params.headers
        },
        ...(params.body ? {body: JSON.stringify(params.body)} : undefined),
    }
    const response = await fetch(url, options)
    if (response.status < 300) {
        return await response.json()
    } else {
        console.log(`Error fetching: ${url}: ${response.statusText}`)
        throw `Cannot fetch ${endpoint}`
    }
}