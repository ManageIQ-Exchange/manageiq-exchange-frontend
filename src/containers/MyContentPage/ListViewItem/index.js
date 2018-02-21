import React from 'react';
import { Switch, Col, Button } from 'patternfly-react';
import { Collapse } from 'react-bootstrap';
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

  render() {
    const { openDetails } = this.state;
    const { full_name, id, published, validation_log } = this.props.dataList;
    const titleBtnValidate = 'Validate';
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
            <div className="list-view-pf-expand">
              <span
                className={`fa fa-angle-${openDetails ? 'down' : 'right'}`}
                onClick={() => this.setState({ openDetails: !openDetails })}
              />
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  <a style={{ textDecoration: 'none' }}>{full_name}</a>
                </div>
                <div className="list-group-item-text" />
              </div>
              <div className="list-view-pf-additional-info">
                <Col md={6} />
                <Col xs={6} md={2}>
                  <Button onClick={() => this.props.onValidate(id)}>
                    {titleBtnValidate}
                  </Button>
                </Col>
                <Switch
                  bsSize="normal"
                  title="normal"
                  id="bsSize-example"
                  onChange={(el, state) => this.onChangeSwicth(el, state, id)}
                  value={published}
                />
                <Col md={2} xs={0} />
              </div>
            </div>
          </div>
        </div>
        <Collapse className="detailsInfo" in={openDetails}>
          <div>
            <h3>Information about log:</h3>
            <span>{validation_log}</span>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default ListViewItem;
