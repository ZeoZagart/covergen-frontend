import React, {useEffect, useState } from "react";
import { fetchUserInfo } from "../../apis/profile";
import { Resume } from "../../types/profile";
import UploadResume from "./UploadResume";
import {Coverletter} from "../../types/api";
import {generateCoverLetter} from "../../apis/api";

const Home: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [jobDescription, setJobDescription] = useState("");
    const [resumeId, setResumeFile] = useState("");
    const [coverLetter, setCoverLetter] = useState<Coverletter | null>(null);

    const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobDescription(e.target.value);
    };

    useEffect(() => {
        fetchUserInfo().then(info => setResumes(info.resumes))
    }, []);

    const handleResumeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`resume id changed: ${e.target.value}`)
        setResumeFile(e.target.value);
    };

    const onResumeUploaded = (resume: Resume) => {
        console.log(`resume upload complete: ${resume.filename}`)
        setResumeFile(resume.filename)
    }

    const handleGenerateCoverLetter = async () => {
        if (!resumeId || !jobDescription) {
            return;
        }
        let coverletter = await generateCoverLetter(resumeId, jobDescription)
        setCoverLetter(coverletter);
    };

    return (
            <div>
                <input
                    type="text"
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                    placeholder="Job Description"
                />
                <UploadResume onUploadComplete={onResumeUploaded} />
                {resumes.length > 0 && (
                        <select value={resumeId} onChange={handleResumeIdChange}>
                            {resumes.map((resume) => (
                                    <option value={resume.filename} key={resume.filename}>
                                        {resume.created_on.toString()}
                                    </option>
                                    ))}
                        </select>
                        )}
                <button disabled={!resumeId || !jobDescription} onClick={handleGenerateCoverLetter}>
                    Generate Cover Letter
                </button>
                {coverLetter && <div>{coverLetter.text}</div>}
            </div>
            );
};

export default Home;
