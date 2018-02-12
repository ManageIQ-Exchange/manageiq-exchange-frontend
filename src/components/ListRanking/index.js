import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Button
} from "patternfly-react";
import { Link, browserHistory } from "react-router";
import GoPrimitiveDot from "react-icons/lib/go/primitive-dot";
import TiSocialGithubCircular from "react-icons/lib/ti/social-github-circular";
import "./style.css";

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
    let valueReturn = id;
    if(this.props.redirectTag)
      id=secondValue;
    this.props.onClickName(id);
  }
  render() {
    let { data, title, twoHeaders, renderBottomBtn, idObject } = this.props;
    let keys = this.props.keys
      ? this.props.keys
      : data && data.length > 0 ? Object.keys(data[0]) : [];
    let heightContent = this.props.height
      ? { height: this.props.height, overflowY: "scroll" }
      : {};
    return (
      <div style={{ height: "550px" }}>
        <div className="header">{title}</div>
        <ListGroup>
          <ListGroupItem className="header-list">
            {twoHeaders && twoHeaders.length === 2 ? twoHeaders[0] : ""}
            <span className="second-header">
              {twoHeaders && twoHeaders.length === 2 ? twoHeaders[1] : ""}
            </span>
          </ListGroupItem>
          <div style={heightContent}>
            {data
              ? data.map((data, index) => {
                  if(!data) return;
                  return (
                    <div key={"data_" + index}>
                      <ListGroupItem>
                        <a
                          className="first-header"
                          onClick={() => this.onClick(data[idObject],data[keys[0]])}
                        >
                          {data[keys[0]]}
                        </a>
                        {this.props.children ? (
                          <a className="second-header" href={data[keys[1]]}>
                            {this.props.children}
                          </a>
                        ) : this.props.removeBadge ? (
                          <Badge
                            id="badgeDescripcions"
                          >
                            {data[keys[1]]}
                          </Badge>
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
            <Button style={{ float: "left" }} onClick={this.redirectTo}> View More</Button>
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
