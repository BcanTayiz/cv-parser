export function transformCVContentToData(cvContent) {
    if (!cvContent || typeof cvContent !== 'string') {
      console.error('CV content is invalid.');
      return null;
    }
  
    const cvData = {
      education: '',
      workExperience: [],
      interests: '',
      achievements: '',
      nationality: '',
      languages: ''
    };
  
    // Split the CV content into sections
    const sections = cvContent.split('Additional Information');
  
    // Extract education data
    if (sections.length > 0) {
      cvData.education = sections[0].trim();
    }
  
    // Extract work experience data
    if (sections.length > 1) {
      const workExperienceSplit = sections[1].split('Work Experience');
      if (workExperienceSplit.length > 1) {
        const workExperienceSection = workExperienceSplit[1].trim();
        const workExperienceEntries = workExperienceSection.split(/(?:\n\s*){2,}/);
        workExperienceEntries.forEach(entry => {
          const lines = entry.trim().split('\n');
          if (lines.length >= 2) {
            const company = lines[0].split(' ').slice(0, -4).join(' ');
            const dates = lines[0].split(' ').slice(-4).join(' ');
            const jobTitle = lines[1];
            const jobResponsibilities = lines.slice(2).map(line => line.trim());
            cvData.workExperience.push({ company, dates, jobTitle, jobResponsibilities });
          }
        });
      }
    }
  
    // Extract additional information
    if (sections.length > 1 && sections[1]) {
      const additionalInfoSection = sections[1].trim();
      const additionalInfoEntries = additionalInfoSection.split('\n');
      additionalInfoEntries.forEach(entry => {
        const [label, value] = entry.split(':');
        const key = label.trim().toLowerCase();
        cvData[key] = value ? value.trim() : ''; // Handle empty values
      });
    }
  
    return cvData;
  }


  export function parseEducation(cvData) {
    const educationStartIndex = cvData.indexOf('EDUCATION');
    if (educationStartIndex === -1) {
        return null; // Return null if 'EDUCATION' keyword is not found
    }

    // Get the substring starting from 'EDUCATION' keyword
    const educationData = cvData.substring(educationStartIndex);

    // Split the education data into individual lines
    const lines = educationData.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines

    // Extracting educational details and group them by degree type
    const educationGroups = {};
    let currentDegree = '';
    let currentGroup = [];

    lines.forEach(line => {
        if (line.includes('Bachelor') || line.includes('Master') || line.includes('PhD')) {
            // New degree type
            currentDegree = line.trim();
            currentGroup = [];
        } else if (line.includes(' - ')) {
            // Date range
            currentGroup.push({ dateRange: line.trim() });
            educationGroups[currentDegree] = currentGroup;
        } else {
            // Institution
            currentGroup.push({ institution: line.trim() });
        }
    });

    return educationGroups;
}
