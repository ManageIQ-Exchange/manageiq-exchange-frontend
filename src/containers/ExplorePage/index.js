import React from "react";
import { Grid, Row, Col, Button } from "patternfly-react";
import { Link, browserHistory } from "react-router";

import ListRanking from "../../components/ListRanking";
import Api from "../../service/Api";
import TiSocialGithubCircular from "react-icons/lib/ti/social-github-circular";
import { connect } from "react-redux";

import { imgIndex } from "../../ImageImport";
import { getTops } from "../../thunk/top";
import "./style.css";

const data_list = [
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 },
  { name: "carlosbuenosvinos.ansistrano-deploy", start: 1408 }
];

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTops();
  }

  redirectTo(route) {
    route = { pathname: route };
    browserHistory.push(route);
  }

  render() {
    let { tops } = this.props;
    let keys = tops ? Object.keys(tops) : [];
    const configurationList = [
      {
        nameAttribute: "Newest",
        nameHeaders: ["Name", "Added On"],
        namesAttributes: ["name", "Added on"]
      },
      {
        nameAttribute: "mostDownloaded",
        nameHeaders: ["Name", "Downloads"],
        namesAttributes: ["name", "Downloads"]
      },
      {
        nameAttribute: "mostStarred",
        nameHeaders: ["Name", "Stars"],
        namesAttributes: ["name", "Stars"]
      },
      {
        nameAttribute: "mostWatched",
        nameHeaders: ["Name", "Watchers"],
        namesAttributes: ["name", "Watchers"]
      },
      {
        nameAttribute: "topContributors",
        nameHeaders: ["Name", "Spin"],
        namesAttributes: ["name", "# Spins"]
      },
      {
        nameAttribute: "topTags",
        nameHeaders: ["Name", "Added On"],
        namesAttributes: ["name", "# Spins"]
      }
    ];
    return (
      <div id="container">
        <div>
          <img
            id="imgHome"
            style={{ height: "50px" }}
            src={imgIndex}
            alt="image init"
          />
          <span className="name-tab">EXPLORE</span>
        </div>
        <Grid width="100%" style={{ marginTop: "50px" }}>
          <Row>
            {configurationList.map((elemConf, index) => {
              if (tops) {
                let data = tops[elemConf.nameAttribute].data;
                let name = tops[elemConf.nameAttribute].name;
                if (data.length === 0) return null;
                return (
                  <Col md={4}>
                    <ListRanking
                      data={data}
                      onClickName={() => {
                        this.redirectTo("/spin/4");
                      }}
                      title={name}
                      twoHeaders={elemConf.nameHeaders}
                      renderBottomBtn={true}
                      keys={elemConf.namesAttributes}
                    />
                  </Col>
                );
              } else return null;
            })}
          </Row>
          <Row style={{ padding: 15 }}>
            <Button id="btnSearch" bsStyle="primary">
              Search
            </Button>
            <Button className="btn-primary" bsStyle="primary">
              Browse Authors
            </Button>
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tops: state.tops
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTops: () => dispatch(getTops())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
