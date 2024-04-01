import React, { useState } from 'react';
import api from '../api';
import EducationCV from './EducationCV';
import { parseEducation } from '../util/transformCV';

const CVComponent = ({ cvData,content_id}) => {
    const [score,setScore] = useState(0)
    const handleScoreCV = async (e) => {
        try {
          const response = await api.get(`/api/profiles/score/${content_id}/`);
          alert('Profile created successfully!');
          // Optionally, you can redirect the user to another page after successful submission
          console.log(response)
          setScore(response.data.cv_score)
        } catch (error) {
          console.error('Error creating profile:', error);
          alert('An error occurred while creating the profile.');
        }
      };


  return (
    <div className="cv-container">
      <h2>Education and Qualifications</h2>
      <EducationCV educationDetails={parseEducation(cvData.education)} />
      
      <h2>Work Experience</h2>
      {cvData.workExperience.map((experience, index) => (
        <div key={index} className="experience">
          <h3>{experience.company}</h3>
          <p>{experience.dates}</p>
          <p>{experience.jobTitle}</p>
          <ul>
            {experience.jobResponsibilities.map((responsibility, idx) => (
              <li key={idx}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
      
      <h2>Additional Information</h2>
      <p><strong>Interests:</strong> {cvData.interests}</p>
      <p><strong>Achievements:</strong> {cvData.achievements}</p>
      <p><strong>Nationality:</strong> {cvData.nationality}</p>
      <p><strong>Languages:</strong> {cvData.languages}</p>
      <button onClick={handleScoreCV}>Score CV</button>
      <p>CV Score:{score}</p>
    </div>
  );
};

export default CVComponent;
