import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'patternfly-react';
import { browserHistory } from 'react-router';
import { translate } from 'react-i18next';

import './style.css';

const propTypes = {
  data: PropTypes.array.isRequired,
  twoHeaders: PropTypes.array.isRequired,
  title: PropTypes.string,
  renderBottomBtn: PropTypes.bool,
  onClickName: PropTypes.func,
  redirectTag: PropTypes.string,
  keys: PropTypes.array,
  height: PropTypes.number,
  idObject: PropTypes.number,
  t: PropTypes.object
};
class ListRanking extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  redirectTo() {
    let route = { pathname: '/search/' };
    browserHistory.push(route);
  }

  onClick(id, secondValue) {
    if (this.props.onClickName) {
      if (this.props.redirectTag) id = secondValue;
      this.props.onClickName(id);
    }
  }
  render() {
    const {
      data,
      title,
      renderBottomBtn,
      twoHeaders,
      idObject,
      t
    } = this.props;
    const keys = this.props.keys
      ? this.props.keys
      : data && data.length > 0 ? Object.keys(data[0]) : [];
    const heightContent = this.props.height
      ? { height: this.props.height, overflowY: 'scroll' }
      : { height: '80%' };
    return (
      <div style={{ height: '550px' }}>
        <div className="header">{title}</div>
        <ListGroup>
          <ListGroupItem className="header-list">
            {twoHeaders && twoHeaders.length === 2 ? twoHeaders[0] : ''}
            <span className="second-header">
              {twoHeaders && twoHeaders.length === 2 ? twoHeaders[1] : ''}
            </span>
          </ListGroupItem>
          <div style={heightContent}>
            {data
              ? data.map((data, index) => {
                  if (!data) return <ListGroupItem />;
                  return (
                    <div key={'data_' + index}>
                      <ListGroupItem>
                        <Row style={{ width: '100%' }}>
                          <Col md={9} xs={9} className="col-header">
                            <a
                              className="first-header link-first-header"
                              onClick={() =>
                                this.onClick(data[idObject], data[keys[0]])
                              }
                            >
                              {data[keys[0]]}
                            </a>
                          </Col>
                          <Col
                            md={3}
                            xs={3}
                            style={{
                              padding: 0,
                              textAlign: 'center',
                              fontSize: '0.8em'
                            }}
                          >
                            {this.props.children ? (
                              <a href={data[keys[1]]} target="_blank">
                                {this.props.children}
                              </a>
                            ) : (
                              <span>{data[keys[1]]}</span>
                            )}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </div>
                  );
                })
              : null}
          </div>
        </ListGroup>
        {renderBottomBtn ? (
          <div className="footer-list">
            <Button style={{ float: 'left' }} onClick={this.redirectTo}>
              {t('explorerPage.btnViewMore')}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

ListRanking.propTypes = propTypes;

export default translate()(ListRanking);
