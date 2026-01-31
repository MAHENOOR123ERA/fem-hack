import React, { useRef } from 'react';
import ReactToPdf from 'react-to-pdf';

const ResumePreview = ({ resume, template }) => {
  const ref = useRef();

  const templateStyles = {
    classic: 'bg-white text-black',
    modern: 'bg-blue-100 text-blue-900'
  };

  return (
    <div>
      <ReactToPdf targetRef={ref} filename={`${resume.title}.pdf`}>
        {({ toPdf }) => <button onClick={toPdf}>Download PDF</button>}
      </ReactToPdf>
      <div ref={ref} className={`p-6 ${templateStyles[template]}`}>
        <h1>{resume.personalInfo.name}</h1>
        <p>{resume.summary}</p>
        {/* Render other sections */}
      </div>
    </div>
  );
};

export default ResumePreview;