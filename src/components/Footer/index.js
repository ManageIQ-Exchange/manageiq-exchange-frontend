import React from "react";
import { Row, Col, Icon } from "patternfly-react";
import { Link } from "react-router";

import Logo from "./manageiq-logo.png";
import "./style.css";

export default class Footer extends React.Component {
  render() {
    const COLOUR_LOGO = "#ffffff";
    return (
      <footer>
        <Row className="indexFooter" style={{ margin: 0 }}>
          <Col md={4}>
            <img className="imgLogo" src={Logo} height={120} width={200} />
          </Col>
          <Col md={4} className="left-border">
            <section>
              <h3>PRODUCTS</h3>
              <ul>
                <li>Ansible Tower</li>
                <li>Tower Editions</li>
                <li>Tower pricing</li>
                <li>Free Tower Trial</li>
                <li>Ansible Consulting</li>
              </ul>
            </section>
            <section>
              <h3>RESOURCES</h3>
              <ul>
                <li>Ansible Quick Start Guide</li>
                <li>Videos</li>
                <li>Webinars & Training</li>
                <li>Case Studies</li>
                <li>Whitepapers</li>
              </ul>
            </section>
          </Col>
          <Col md={4} className="left-border">
            <section>
              <h3>COMMUNITY</h3>
              <ul>
                <li>Upcoming Events</li>
                <li>Ansible on Meetup</li>
                <li>Ansible on Github</li>
              </ul>

              <ul>
                <li>ANSIBLE SUPPORT</li>
                <li>ANSIBLE DOCS</li>
                <li>ANSIBLE STORE</li>
                <li>ANSIBLE BLOG</li>
              </ul>

              <div className="content-icon">
                <a
                  href="https://github.com/miq-consumption/manageiq-galaxy"
                  target="_blank"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="twitter-square fa-3x"
                  />
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="linkedin-square fa-3x"
                  />
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="facebook-square fa-3x"
                  />
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="github-square fa-3x"
                  />
                </a>
              </div>
            </section>
          </Col>
        </Row>
      </footer>
    );
  }
}
