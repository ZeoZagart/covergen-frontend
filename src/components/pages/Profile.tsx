import React, { useState, useEffect } from 'react';
import { fetchUserInfo, fetchUserStats } from '../../apis/profile';
import { UserInfo, UserStats, Resume } from '../../types/profile';
import UploadResume from './UploadResume';

function printResume(resume: Resume): String {
    return `
        Resume ID: ${resume.filename} ,
        Tags: ${resume.tags.join(', ')} ,
        Created on: ${resume.created_on}
    `;
}

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);

    useEffect(() => {
        fetchUserInfo().then(setUserInfo);
        fetchUserStats().then(setUserStats);
        }, []);

    if (!userInfo || !userStats) {
        return <div>Loading...</div>;
    }

    const handleResumeUpload = (resume: Resume) => {
        console.log(`New resume uploaded`)
        setUserInfo({
            ...userInfo,
            resumes: [...userInfo.resumes, resume]
        })
    }

    return (
            <div>
                <div>
                    <img src={userInfo.image} alt="User" />
                    <div>
                        <h2>{userInfo.name}</h2>
                        <h3>{userInfo.email}</h3>
                    </div>
                </div>
                <div>
                    <h2>Statistics</h2>
                    <div>
                        <h3>Jobs Applied: {userStats.jobs_applied}</h3>
                        <h3>Active Applications: {userStats.activeApplications}</h3>
                    </div>
                </div>
                <div>
                    <h2>Resumes</h2>
                    <ul>
                        {userInfo.resumes.map((resume) => (
                                <li key={resume.filename}>
                                    <p>{printResume(resume)}</p>
                                </li>
                                ))
                        }
                    </ul>
                    <UploadResume onUploadComplete={handleResumeUpload} />
                </div>
            </div>
            );
};

export default Profile;
