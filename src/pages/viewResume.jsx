import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ResumePreview from '../components/resume/ResumePreview';

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      const docSnap = await getDoc(doc(db, 'resumes', id));
      if (docSnap.exists()) setResume({ id: docSnap.id, ...docSnap.data() });
    };
    if (id) fetchResume();
  }, [id]);

  if (!resume) return <div>Loading...</div>;

  return <ResumePreview resume={resume} template={resume.template} />;
};

export default ViewResume;