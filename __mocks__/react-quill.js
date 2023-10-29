// __mocks__/react-quill.js

import React from "react";

const ReactQuill = ({ onChange, ...props }) => {
  // Call the onChange method when the textarea value changes
  const handleTextChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return <textarea {...props} onChange={handleTextChange} />;
};

export default ReactQuill;
