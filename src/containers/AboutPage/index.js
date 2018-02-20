import React from 'react';
import ReactMarkdown from 'react-markdown';
import content from '../../markdown/index.md';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <ReactMarkdown source={content} />
      </div>
    );
  }
}
