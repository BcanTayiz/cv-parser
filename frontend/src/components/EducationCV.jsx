import React from 'react';

function EducationCV({ educationDetails }) {

    if(educationDetails){
        return (
            <div>
                <h2>Education</h2>
                {Object.keys(educationDetails).map(degreeType => (
                    <div key={degreeType}>
                        <h3>{degreeType}</h3>
                        {educationDetails[degreeType].map((education, index) => (
                            <div key={index}>
                                <p>{education.institution}</p>
                                <p>{education.dateRange}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }else{
        return(
            <div>Education Details are not parsed</div>
        )
    }
    
}

export default EducationCV;
