import React from 'react';
import ReactMarkdown from 'react-markdown';

const TabReadme = ({ textReadme }) => {
  return (
    <div style={{ padding: 15 }}>
      <ReactMarkdown source={textReadme} />
    </div>
  );
};
export default TabReadme;
