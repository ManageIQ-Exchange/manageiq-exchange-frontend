import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Button
} from 'patternfly-react';
import { Link, browserHistory } from "react-router";
import GoPrimitiveDot from "react-icons/lib/go/primitive-dot";
import TiSocialGithubCircular from "react-icons/lib/ti/social-github-circular";
import "./style.css";

class ListRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, title, twoHeaders, renderBottomBtn } = this.props;
    let keys = data ? Object.keys(data[0]) : [];
    let heightContent = this.props.height
      ? { height: this.props.height, overflowY: 'scroll' }
      : {};
    return (
      <div style={{ height: "550px" }}>
        <div className="header">{title}</div>
        <ListGroup>
          <ListGroupItem className="header-list">
            {twoHeaders[0]}
            <span className="second-header">{twoHeaders[1]}</span>
          </ListGroupItem>
          <div style={heightContent}>
            {data
              ? data.map((data, index) => {
                  return (
                    <div key={"data_" + index}>
                      <ListGroupItem>
                        <a
                          className="first-header"
                          onClick={this.props.onClickName}
                        >
                          {data[keys[0]]}
                        </a>
                        {this.props.children ? (
                          <span className="second-header">
                            {this.props.children}
                          </span>
                        ) : (
                          <Badge>{data[keys[1]]}</Badge>
                        )}
                      </ListGroupItem>
                    </div>
                  );
                })
              : null}
          </div>

        </ListGroup>
        {renderBottomBtn ? (
          <div className="footer-list">
            <Button style={{ float: "left" }}> View More</Button>
          </div>
        ) : null}
      </div>
    );
  }
}

ListRanking.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  renderBottomBtn: PropTypes.bool
};

export default ListRanking;
