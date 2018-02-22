import React from 'react';
import { Grid } from 'patternfly-react';
import ReactMarkdown from 'react-markdown';
import content from '../../markdown/index.md';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <Grid width="100%">
          <ReactMarkdown source={content} />
        </Grid>
      </div>
    );
  }
}
