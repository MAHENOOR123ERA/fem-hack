import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import ResumeCard from "./resume/ResumeCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "resumes"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setResumes(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "resumes", id));
    fetchResumes();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      {/* 🔥 CREATE BUTTON */}
      <button onClick={() => navigate("/resume")}>
        ➕ Create Resume
      </button>

      <hr />
      

      {/* 🔥 LIST */}
      {resumes.length === 0 ? (
        <p>No resumes found</p>
      ) : (
        resumes.map(resume => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            onView={() => navigate(`/view/${resume.id}`)}
            onEdit={() => navigate(`/edit/${resume.id}`)}
            onDelete={() => handleDelete(resume.id)}
          />
          
        ))
      )}
    </div>
  );
};

export default Dashboard;
