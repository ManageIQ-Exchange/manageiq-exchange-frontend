import React from 'react';
import ReactMarkdown from 'react-markdown';

import markdown from '../../markdown/';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <ReactMarkdown source={markdown} />
      </div>
    );
  }
}
