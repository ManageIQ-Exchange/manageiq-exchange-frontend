import React from 'react';
import { Row, Col, Icon } from 'patternfly-react';

import Logo from './manageiq-logo.png';
import './style.css';

export default class Footer extends React.Component {
  render() {
    const COLOUR_LOGO = '#ffffff';
    const heightBanner = 120;
    const widthBanner = 200;
    return (
      <footer style={{ height: '100%' }}>
        <Row className="indexFooter" style={{ margin: 0, height: '100%' }}>
          <Col md={4}>
            <img
              className="imgLogo"
              alt="logo manageiq"
              src={Logo}
              height={heightBanner}
              width={widthBanner}
            />
          </Col>
          <Col md={4} className="left-border">
            <section>
              <ul>
                <li>
                  <a
                    className="link-index"
                    href="http://www.manageiq.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ Website
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="http://www.manageiq.org/blog/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ Blog
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="http://talk.manageiq.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ Talk forum
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="https://gitter.im/manageiq/manageiq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ on Gitter
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="https://github.com/ManageIQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ on GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="https://github.com/ManageIQ-Exchange"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ManageIQ Exchange on GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="https://www.redhat.com/en/technologies/management/cloudforms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Red Hat CloudForms
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <ul>
                <li>
                  <a
                    className="link-index"
                    href="https://github.com/ManageIQ-Exchange/manageiq-exchange-frontend/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Exchange Frontend issues
                  </a>
                </li>
                <li>
                  <a
                    className="link-index"
                    href="https://github.com/ManageIQ-Exchange/manageiq-exchange/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Exchange API issues
                  </a>
                </li>
              </ul>
            </section>
          </Col>
          <Col md={4} className="left-border">
            <section>
              <ul />
              <ul />
              <div className="content-icon">
                <a
                  href="http://www.slideshare.net/ManageIQ/presentations"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="slideshare fa-3x"
                  />
                </a>
                <a
                  href="https://www.youtube.com/user/ManageIQVideo"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="youtube-square fa-3x"
                  />
                </a>
                <a
                  href="https://twitter.com/ManageIQ"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="twitter-square fa-3x"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/manageiq"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="linkedin-square fa-3x"
                  />
                </a>
                <a
                  href="https://www.facebook.com/manageiq/"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    style={{ color: COLOUR_LOGO }}
                    name="facebook-square fa-3x"
                  />
                </a>
                <a
                  href="https://github.com/ManageIQ-Exchange"
                  className="a-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
