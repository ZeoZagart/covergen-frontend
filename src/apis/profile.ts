import { UserInfo, UserStats, Resume } from "../types/profile";
import { covergenFetch } from "./base";


export async function fetchUserInfo(): Promise<UserInfo> {
    return covergenFetch<UserInfo>('user/info', 'GET')
}

export async function fetchUserStats(): Promise<UserStats> {
    return covergenFetch<UserStats>('user/stats', 'GET')
}

export async function uploadResume(email: string, file: File): Promise<Resume> {
    const formData = new FormData();
    formData.append('file', file);
    const resume = await getResumePartial(email, file)
    const result = await fetch(resume.url, {
        method: 'PUT',
        body: formData
    })
    return resume
}

async function getResumePartial(email: string, file: File): Promise<Resume> {
    return covergenFetch<Resume>('upload/url', 'POST', {
        body: {
            fileSize: file.size,
            fileType: file.type,
            email: email
        }
    })
}