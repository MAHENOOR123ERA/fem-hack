import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResumeForm from '../components/resume/ResumeForm';

const EditResume = () => {
  const { id } = useParams(); // 'new' for new resume, or existing ID
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/dashboard'); // Redirect after saving
  };

  return <ResumeForm resumeId={id === 'new' ? null : id} onSave={handleSave} />;
};

export default EditResume;