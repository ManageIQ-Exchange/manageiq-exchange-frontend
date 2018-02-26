import React from 'react';
import { Grid, Col } from 'patternfly-react';
import Markdown from 'react-markdown';
import stripColor from 'strip-color';
import diacritics from 'diacritics-map';
import content from '../../markdown/index.md';
import toc from '../../markdown/toc.md';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this._flatten = this._flatten.bind(this);
    this._HeadingRenderer = this._HeadingRenderer.bind(this);
    this._replaceDiacritics = this._replaceDiacritics.bind(this);
    this._getTitle = this._getTitle.bind(this);
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

    // `.split()` is often (but not always) faster than `.replace()`
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
          <Col xs={12} md={4} lg={3}>
            <Markdown source={toc} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Markdown
              source={content}
              renderers={{ heading: this._HeadingRenderer }}
            />
          </Col>
        </Grid>
      </div>
    );
  }
}
