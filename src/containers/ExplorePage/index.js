import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { Link, browserHistory } from 'react-router';

import ListRanking from '../../components/ListRanking';
import Api from '../../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

import { imgIndex } from '../../ImageImport';
import './style.css';

const data_list = [{name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408},
                  {name: 'carlosbuenosvinos.ansistrano-deploy', start:1408}
];

export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    redirectTo(route) {
      route = {pathname: route}
      browserHistory.push(route);
    }

    render() {

      return (
        <div id="container">

        <div >
          <img id="imgHome" style={{height:'50px'}} src={imgIndex} alt="image init"  />
          <span className="name-tab">EXPLORE</span>
        </div>
        <Grid width="100%" style={{marginTop:'50px'}} >
          <Row >
            <Col md={4}>
                <ListRanking
                  data={data_list}
                  onClickName={() => {this.redirectTo('/author/4')}}
                  title={'Most Starred'}
                  twoHeaders={['Name','Starts']}
                  renderBottomBtn={true}
                 />
            </Col>
            <Col md={4}>
              <ListRanking
                data={data_list}
                onClickName={() => {this.redirectTo('/author/4')}}
                title={'Most Starred'}
                twoHeaders={['Name','Starts']}
                renderBottomBtn={true}
               />
            </Col>
            <Col md={4}>
              <ListRanking
                data={data_list}
                onClickName={() => {this.redirectTo('/author/4')}}
                title={'Most Starred'}
                twoHeaders={['Name','Starts']}
                renderBottomBtn={true}
               />
            </Col>
          </Row>
          <Row style={{padding:15}}>
            <Button id="btnSearch" bsStyle="primary">Search</Button>
          </Row>
          <Row >
            <Col md={4}>
                <ListRanking
                  data={data_list}
                  onClickName={() => {this.redirectTo('/author/4')}}
                  title={'Top Tags'}
                  twoHeaders={['Tag','# Repos']}
                 />
            </Col>
            <Col md={4}>
              <ListRanking
                data={data_list}
                onClickName={() => {this.redirectTo('/author/4')}}
                title={'Top Contributors'}
                twoHeaders={['User','# Repos']}
               />
            </Col>
            <Col md={4}>
              <ListRanking
                data={data_list}
                onClickName={() => {this.redirectTo('/author/4')}}
                title={'Newest'}
                twoHeaders={['Name','Added On']}
               />
            </Col>
          </Row>
          <Row style={{padding:15}}>
            <Button className="btn-primary" bsStyle="primary">Browse Authors</Button>
          </Row>
        </Grid>

        </div>
      )
    }
}
