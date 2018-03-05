import React from 'react';
import { Grid, Col } from 'patternfly-react';
import Markdown from 'react-markdown';
import stripColor from 'strip-color';
import diacritics from 'diacritics-map';

import content from '../../markdown/index.md';
import toc from '../../markdown/toc.md';

import './style.css';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this._flatten = this._flatten.bind(this);
    this._HeadingRenderer = this._HeadingRenderer.bind(this);
  }

  _flatten(text, child) {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(
          this._flatten,
          text
        );
  }
  _getTitle(str) {
    if (/^\[[^\]]+\]\(/.test(str)) {
      var m = /^\[([^\]]+)\]/.exec(str);
      if (m) return m[1];
    }
    return str;
  }

  _replaceDiacritics(str) {
    return str.replace(/[À-ž]/g, function(ch) {
      return diacritics[ch] || ch;
    });
  }

  _slugify(str) {
    str = this._getTitle(str);
    str = stripColor(str);
    str = str.toLowerCase();

    str = str.split(' ').join('-');
    str = str.split(/\t/).join('--');
    str = str.split(/<\/?[^>]+>/).join('');
    str = str.split(/[|$&`~=\\@+*!?({[\]})<>=.,;:'"^]/).join('');
    str = str
      .split(
        /[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/
      )
      .join('');
    str = this._replaceDiacritics(str);
    return str;
  }

  _HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(this._flatten, '');
    var slug = this._slugify(text);
    return React.createElement('h' + props.level, { id: slug }, props.children);
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <Grid width="100%">
          <Col md={4} xs={12}>
            <div className="container-toc">
              <div className="container-a-link">
                <a href="#top-page-about" className="a-about">
                  BACK TO TOP
                </a>
              </div>
              <Markdown source={toc} />
              <div className="container-a-link">
                <a href="#bottom-page-about" className="a-about">
                  GO TO BOTTOM
                </a>
              </div>
            </div>
          </Col>
          <Col md={8} xs={12} id="top-page-about">
            <Markdown
              source={content}
              renderers={{ heading: this._HeadingRenderer }}
            />
            <div id="bottom-page-about" />
          </Col>
        </Grid>
      </div>
    );
  }
}
