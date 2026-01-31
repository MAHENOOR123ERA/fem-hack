import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ResumeForm = ({ resumeId, onSave }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    personalInfo: { name: '', email: '', phone: '' },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: [],
    summary: '',
    image: '',
    template: 'classic',
    versions: [] // For version history
  });
  const [sections, setSections] = useState(['personalInfo', 'education', 'experience', 'skills', 'projects', 'languages', 'summary']); // Draggable sections

  useEffect(() => {
    if (resumeId) {
      const fetchResume = async () => {
        const docSnap = await getDoc(doc(db, 'resumes', resumeId));
        if (docSnap.exists()) setFormData(docSnap.data());
      };
      fetchResume();
    }
  }, [resumeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVersion = { ...formData, timestamp: new Date() };
    const updatedData = { ...formData, versions: [...formData.versions, newVersion] };
    if (resumeId) {
      await updateDoc(doc(db, 'resumes', resumeId), updatedData);
    } else {
      await addDoc(collection(db, 'resumes'), { ...updatedData, userId: user.uid });
    }
    onSave();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  // Helper to update simple fields
  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Helper to update nested personalInfo
  const updatePersonalInfo = (key, value) => {
    setFormData({ ...formData, personalInfo: { ...formData.personalInfo, [key]: value } });
  };

  // Helpers for arrays
  const addItem = (arrayKey) => {
    const newItem = arrayKey === 'education' ? { degree: '', school: '', year: '' } :
                    arrayKey === 'experience' ? { jobTitle: '', company: '', duration: '' } :
                    arrayKey === 'skills' ? { skill: '' } :
                    arrayKey === 'projects' ? { name: '', description: '' } :
                    { language: '', proficiency: '' };
    setFormData({ ...formData, [arrayKey]: [...formData[arrayKey], newItem] });
  };

  const removeItem = (arrayKey, index) => {
    const updatedArray = formData[arrayKey].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayKey]: updatedArray });
  };

  const updateItem = (arrayKey, index, key, value) => {
    const updatedArray = formData[arrayKey].map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setFormData({ ...formData, [arrayKey]: updatedArray });
  };

  // Handle image upload (simple base64 for demo; use Firebase Storage in prod)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => updateField('image', reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Render section content
  const renderSection = (section) => {
    switch (section) {
      case 'personalInfo':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Personal Information</h3>
            <input type="text" placeholder="Name" value={formData.personalInfo.name} onChange={(e) => updatePersonalInfo('name', e.target.value)} required className="w-full p-2 border rounded mb-2" />
            <input type="email" placeholder="Email" value={formData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} required className="w-full p-2 border rounded mb-2" />
            <input type="tel" placeholder="Phone" value={formData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        );
      case 'education':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', index, 'degree', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <input type="text" placeholder="School" value={edu.school} onChange={(e) => updateItem('education', index, 'school', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateItem('education', index, 'year', e.target.value)} className="w-full p-1 border rounded" />
                <button type="button" onClick={() => removeItem('education', index)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('education')} className="bg-green-500 text-white p-2 rounded">Add Education</button>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <input type="text" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => updateItem('experience', index, 'jobTitle', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateItem('experience', index, 'company', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => updateItem('experience', index, 'duration', e.target.value)} className="w-full p-1 border rounded" />
                <button type="button" onClick={() => removeItem('experience', index)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('experience')} className="bg-green-500 text-white p-2 rounded">Add Experience</button>
          </div>
        );
      case 'skills':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Skills</h3>
            {formData.skills.map((skill, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <input type="text" placeholder="Skill" value={skill.skill} onChange={(e) => updateItem('skills', index, 'skill', e.target.value)} className="w-full p-1 border rounded" />
                <button type="button" onClick={() => removeItem('skills', index)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('skills')} className="bg-green-500 text-white p-2 rounded">Add Skill</button>
          </div>
        );
      case 'projects':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Projects / Certifications</h3>
            {formData.projects.map((proj, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateItem('projects', index, 'name', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <textarea placeholder="Description" value={proj.description} onChange={(e) => updateItem('projects', index, 'description', e.target.value)} className="w-full p-1 border rounded" />
                <button type="button" onClick={() => removeItem('projects', index)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('projects')} className="bg-green-500 text-white p-2 rounded">Add Project</button>
          </div>
        );
      case 'languages':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Languages</h3>
            {formData.languages.map((lang, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <input type="text" placeholder="Language" value={lang.language} onChange={(e) => updateItem('languages', index, 'language', e.target.value)} className="w-full p-1 border rounded mb-1" />
                <input type="text" placeholder="Proficiency" value={lang.proficiency} onChange={(e) => updateItem('languages', index, 'proficiency', e.target.value)} className="w-full p-1 border rounded" />
                <button type="button" onClick={() => removeItem('languages', index)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('languages')} className="bg-green-500 text-white p-2 rounded">Add Language</button>
          </div>
        );
      case 'summary':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Profile Summary</h3>
            <textarea placeholder="Summary" value={formData.summary} onChange={(e) => updateField('summary', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Resume Title"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
        {formData.image && <img src={formData.image} alt="Profile" className="w-20 h-20 rounded mb-4" />}
        <select value={formData.template} onChange={(e) => updateField('template', e.target.value)} className="mb-4 p-2 border rounded">
          <option value="classic">Classic Template</option>
          <option value="modern">Modern Template</option>
        </select>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="border p-4 mb-4 bg-gray-50 rounded">
                      {renderSection(section)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save Resume</button>
      </form>
    </DragDropContext>
  );
};

export default ResumeForm;