import React from 'react';

const TemplateSelector = ({ selectedTemplate, onSelect }) => (
  <div>
    <button onClick={() => onSelect('classic')}>Classic</button>
    <button onClick={() => onSelect('modern')}>Modern</button>
  </div>
);

export default TemplateSelector;