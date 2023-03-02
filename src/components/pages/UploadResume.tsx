import React, { useState } from 'react';
import { uploadResume } from '../../apis/profile';
import { Resume } from '../../types/profile';
import {LoginResponse} from "../../types/auth";

interface Props {
    onUploadComplete: (resume: Resume) => void;
}

const UploadResume: React.FC<Props> = ({ onUploadComplete }) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [result, setResult] = useState<Resume | undefined>(undefined);
    const [uploadError, setUploadError] = useState<string | undefined>(undefined);
    const user = JSON.parse(localStorage.getItem('user')!) as LoginResponse

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            console.log(`null file: ${file}`)
            return;
        }
        console.log(`selected by: type: ${file.type}, size: ${file.size}`)
        setFile(file);
    }

    const handleUpload = async () => {
        if (!file) {
            setUploadError(`No file to upload: ${file}`)
            return;
        }

        let uploadResult: Resume = await uploadResume(user.email, file)
        console.log(`resume upload result: ${JSON.stringify(uploadResult)}`)
        onUploadComplete(uploadResult)
        setResult(uploadResult)
    }

    return (
            <div>
                <h3>Upload New Resume</h3>
                <input type="file" onChange={handleFileChange} accept=".pdf" required />
                <br/>
                <button onClick={handleUpload}>Submit</button>
                <br/>
                <h4>{uploadError}</h4>
                <br />
            </div>
            );
}

export default UploadResume;


