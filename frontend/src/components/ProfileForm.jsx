import React, { useState,useEffect } from 'react';
import api from '../api';

const ProfileForm = ({formData,setFormData,handleFileChange,handleSubmit}) => {
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  

  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text_title">Text Title:</label>
      <input
        type="text"
        id="text_title"
        name="text_title"
        value={formData.text_title}
        onChange={handleChange}
      />
      <label htmlFor="text_content">Content:</label>
      <textarea
        type="text"
        id="text_content"
        name="text_content"
        value={formData.text_content}
        onChange={handleChange}
      />
      <label htmlFor="text_cfr_level">Text CFR Title:</label>
      <input
        type="text"
        id="text_cfr_level"
        name="text_cfr_level"
        value={formData.text_cfr_level}
        onChange={handleChange}
      />
      <label htmlFor="text_score">Text Score:</label>
      <input
        type="number"
        id="text_score"
        name="text_score"
        value={formData.text_score}
        onChange={handleChange}
      />
      <div>
        <label htmlFor="cv_file">CV File:</label>
        <input
          type="file"
          id="cv_file"
          name="cv_file"
          accept=".pdf,.doc,.docx" // Specify accepted file formats
          onChange={handleFileChange}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
