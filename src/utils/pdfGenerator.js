import ReactPDF from 'react-to-pdf';

const ref = React.createRef();

const PdfComponent = ({ resume }) => (
  <div ref={ref}>
    {/* Resume content */}
  </div>
);

export const downloadPdf = () => {
  ReactPDF.render(<PdfComponent resume={resume} />, `${resume.title}.pdf`);
};