// src/components/Resume/ResumeCard.jsx
import React from 'react';

const ResumeCard = ({ resume, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{resume.title}</h3>
      <p>{resume.skills?.join(', ')}</p>
      <button onClick={() => onDelete(resume.id)}>Delete</button>
    </div>
  );
};

export default ResumeCard;
