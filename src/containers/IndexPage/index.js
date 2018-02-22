import React from 'react';
import { Grid, Row, Col, Icon } from 'patternfly-react';
import MdStar from 'react-icons/lib/fa/star';
import './style.css';
import imgHome from './manageiq-logo-standard.svg';
import Footer from '../../components/Footer/index';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', overflowY: 'none' }}>
        <div id="imgHomeContent">
          <img id="imgHome" src={imgHome} alt="init" />
        </div>
        <Grid width="100%" height="40%">
          <Row style={{ height: '90%', padding: '8px' }}>
            <Col md={4}>
              <h2 style={{ color: '#878C95' }}>
                <Icon
                  className="icon icon-download"
                  name="cloud-download fa-2x"
                />DOWNLOAD
              </h2>
              <p>
                Jump-start your automation project with great content from the
                Ansible community. EXCHANGE provides pre-packaged units of work
                known to Ansible as roles
              </p>
              <p>
                Roles can be dropped into Ansible PlayBooks and immediately put
                to work. You ll find roles for provisioning infrastructure,
                deploying applications, and all of the tasks you do everyday.
              </p>
              <p>
                Use Search to find roles for your project, then download them
                onto your Ansible host using the ansible-EXCHANGE command that
                comes bundled with Ansible.
              </p>
            </Col>
            <Col md={4}>
              <h2>
                <Icon
                  className="icon icon-share "
                  name="share-alt-square fa-2x"
                />SHARE
              </h2>
              <p>
                Jump-start your automation project with great content from the
                Ansible community. EXCHANGE provides pre-packaged units of work
                known to Ansible as roles
              </p>
              <p>
                Roles can be dropped into Ansible PlayBooks and immediately put
                to work. You ll find roles for provisioning infrastructure,
                deploying applications, and all of the tasks you do everyday.
              </p>
              <p>
                Use Search to find roles for your project, then download them
                onto your Ansible host using the ansible-EXCHANGE command that
                comes bundled with Ansible.
              </p>
            </Col>
            <Col md={4} className="tabFeature">
              <h2>
                <MdStar style={{ color: '#FFFFFF' }} /> FEATURED
              </h2>
              <div className="content-feature">
                <p>
                  ROLE:jdauphant.nginx - Ansible role to install and manage
                  nginx configuration{' '}
                </p>
              </div>
              <div className="content-feature">
                <p>AUTHOR:andrewrothstein with 239 roles. </p>
              </div>
              <div className="content-feature">
                <p>
                  BLOG: Read the latest from The Inside Playbook, and keep up
                  with what &#39;s happening in the Ansible universe.
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
        <div style={{ height: '40%', width: '100%' }}>
          <Footer style={{ width: '100%' }} />
        </div>
      </div>
    );
  }
}
