import React from 'react';
import { Switch, Col, Button } from 'patternfly-react';
import { Collapse } from 'react-bootstrap';

import * as constant from './constant';
import './style.css';

class ListViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    };
  }
  onChangeSwicth = (el, state, id) => {
    this.props.onPublish(el, state, id);
  };

  openDetails = () => {
    const { openDetails } = this.state;
    this.setState({ openDetails: !openDetails });
  };
  renderLog(log) {
    return log.split('\n').map((item, key) => {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      );
    });
  }
  render() {
    const { openDetails } = this.state;
    const { full_name, id, published, validation_log } = this.props.dataList;
    const colorHeader = openDetails ? '#edf8ff' : '';
    const shadow = openDetails
      ? '0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)'
      : '';
    return (
      <div className="info-item" style={{ boxShadow: shadow }}>
        <div
          className="list-group-item"
          id="info-header"
          style={{ backgroundColor: colorHeader }}
        >
          <div className="list-view-pf-main-info" style={{ height: '60px' }}>
            <div className="list-view-pf-left">
              <span className="fa pficon-service-catalog list-view-pf-icon-sm" />
            </div>
            <div className="list-view-pf-expand">
              <span
                className={`fa fa-angle-${openDetails ? 'down' : 'right'}`}
                onClick={this.openDetails}
              />
            </div>
            <div className="list-view-pf-body">
              <Col md={6} xs={6}>
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading">
                    <a style={{ textDecoration: 'none' }}>{full_name}</a>
                  </div>
                  <div className="list-group-item-text" />
                </div>
              </Col>
              <Col md={6} xs={6}>
                <Col md={6} />
                <Col xs={2} md={2}>
                  <Button onClick={() => this.props.onValidate(id)}>
                    {constant.titleBtnValidate}
                  </Button>
                </Col>
                <Col xs={2} md={2}>
                  <Switch
                    bsSize="normal"
                    title="normal"
                    id="bsSize-example"
                    onChange={(el, state) => this.onChangeSwicth(el, state, id)}
                    value={published}
                  />
                </Col>
                <Col md={2} xs={2}>
                  <Button onClick={this.openDetails}>
                    {constant.titleBtnDetails}
                  </Button>
                </Col>
              </Col>
            </div>
          </div>
        </div>
        <Collapse className="detailsInfo" in={openDetails}>
          <div>
            <h3>
              <strong>Validation log:</strong>
            </h3>
            <span>{this.renderLog(validation_log)}</span>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default ListViewItem;
