import { Coverletter } from "../types/api";
import {covergenFetch} from "./base";

export async function generateCoverLetter(resume_id: string, job_desc: string): Promise<Coverletter> {
    return covergenFetch<Coverletter>('api/coverletter', 'POST', {
        body: {
            resume_id: resume_id,
            job_description: job_desc
        }
    })
}