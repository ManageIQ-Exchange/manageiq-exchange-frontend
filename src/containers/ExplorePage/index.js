import React from 'react';
import { Grid, Row, Col, Button, Table } from 'patternfly-react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import ListRanking from '../../components/ListRanking';
import { imgIndex } from '../../ImageImport';
import { getTops } from '../../thunk/top';
import { configurationList } from './configuration';

import './style.css';

class ExplorePage extends React.Component {

  componentDidMount() {
    this.props.getTops();
  }

  redirectTo(id, redirectUser, redirectTag) {
    let nameRoute = redirectUser
      ? "/authors/" + id
      : redirectTag ? "/search/" : "/spin/" + id;
    let state = redirectTag ? { tag: id } : {};

    let route = { pathname: nameRoute, state };
    browserHistory.push(route);
  }
  redirectByRoute(nameRoute) {
    let route = { pathname: nameRoute };
    browserHistory.push(route);
  }

  render() {
    let { tops } = this.props;

    return (
      <div id="container">
        {/*
        <div>
          <img
            id="imgHome"
            style={{ height: "50px" }}
            src={imgIndex}
            alt="image init"
          />
          <span className="name-tab">EXPLORE</span>
        </div>
        */
      }

        <Grid width="100%" style={{ marginTop: '50px' }}>
          <Row style={{ padding: 15 }}>
            <Button
              style={{ marginLeft: '3%' }}
              onClick={() => this.redirectByRoute('/search/')}
              id="btnSearch"
              bsStyle="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => this.redirectByRoute('/authors/')}
              className="btn-primary"
              bsStyle="primary"
            >
              Browse Authors
            </Button>
          </Row>
          <Row>
            {configurationList.map((elemConf, index) => {
              if (tops) {
                let data = tops[elemConf.nameAttribute].data.slice();
                let name = tops[elemConf.nameAttribute].name;
                if (elemConf.changeData) {
                  data.forEach(item => {
                    let formatDate = moment(
                      item[elemConf.namesAttributes[1]]
                    ).format("YYYY-MM-DD");
                    item[elemConf.namesAttributes[1]] = formatDate;
                  });
                }
                if (data.length === 0) return null;
                return (
                  <Col md={4}>
                    <ListRanking
                      data={data}
                      onClickName={id => {
                        this.redirectTo(
                          id,
                          elemConf.redirectUser,
                          elemConf.redirectTag
                        );
                      }}
                      title={name}
                      twoHeaders={elemConf.nameHeaders}
                      renderBottomBtn
                      keys={elemConf.namesAttributes}
                      idObject="id"
                      redirectTag={elemConf.redirectTag}
                    />
                  </Col>
                );
              } else return null;
            })}
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
