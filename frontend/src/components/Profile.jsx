import React,{useEffect, useState} from "react";
import "../styles/Profile.css"
import { transformCVContentToData } from "../util/transformCV";
import CVComponent from "./CvComponent";
import api from "../api";

function Profile({ profile, onDelete,getProfiles }) {
    const formattedDate = new Date(profile.created_at).toLocaleDateString("en-US")
    const [isEditing, setIsEditing] = useState(false);
const [cvIsEditing, setCvIsEditing] = useState(false);
const [formData, setFormData] = useState({
  text_content: "",
  cv_content: "",
});

// Update formData when profile prop changes
useEffect(() => {
  setFormData({
      text_content: profile.text_content,
      cv_content: profile.cv_content
  });
}, [profile]);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleDoubleClick = () => {
  setIsEditing(true);
};

const handleCvDoubleClick = () => {
  setCvIsEditing(true);
};

const fetchData = async () => {
  try {
      const response = await api.patch(`/api/profiles/change-text/${profile.id}/`, formData);
      console.log('Success:', response.data);
      // Update profile data with the response data
      setFormData(response.data);
      // If needed, you can also refetch the profiles after updating
      getProfiles(); // Assuming this function fetches profiles again
  } catch (error) {
      console.error('Error:', error);
      // Handle error - e.g., show an error message to the user
  }
}

const handleBlur = async (e) => {
  e.preventDefault();
  if (isEditing || cvIsEditing) {
      setIsEditing(false);
      setCvIsEditing(false);
      await fetchData();
  }
};

return (
  <div className="note-container">
    <p className="note-title">{profile.text_title}</p>
    {isEditing ? (
      <textarea
        className="textarea"
        name="text_content"
        value={formData.text_content}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
    ) : (
      <div className="text" onDoubleClick={handleDoubleClick}>{profile.text_content}</div>
    )}
    <p className="note-date">{formattedDate}</p>
    <p className="cv-title">{profile.cv_title}</p>
    {cvIsEditing ? (
      <textarea
        className="textarea"
        name="cv_content"
        value={formData.cv_content}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
    ) : (
      <CVComponent onDoubleClick={handleCvDoubleClick} cvData={transformCVContentToData(profile.cv_content)} content_id={profile.id} />
    )}
    <p className="note-title">{profile.text_cfr_level && profile.text_cfr_level}</p>
    <p className="note-content">{profile.text_score && profile.text_score}</p>
    <button className="delete-button" onClick={() => onDelete(profile.id)}>
      Delete
    </button>
  </div>
);
}

export default Profile