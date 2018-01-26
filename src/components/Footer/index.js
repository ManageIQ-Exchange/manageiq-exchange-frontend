import React from 'react';
import { Row, Col } from 'patternfly-react';
import { Link } from 'react-router';
import GoPrimitiveDot from 'react-icons/lib/go/primitive-dot';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';
import FaTwitter from 'react-icons/lib/fa/twitter';
import LFaceBook from 'react-icons/lib/fa/facebook-square';
import LLinkedin from 'react-icons/lib/fa/linkedin-square';
import Logo from './manageiq-logo.png';
import './style.css';

export default class Footer extends React.Component {

  render() {
   const SIZE_LOGO = 40;
   const COLOUR_LOGO = '#ffffff';
    return (
      <footer>
        <Row className="indexFooter" style={{margin:0}}  >
          <Col md={4} >
            <img className="imgLogo" src={Logo} height={120} width={350} />
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

              <div>
                   <a href="https://github.com/miq-consumption/manageiq-galaxy" target="_blank">
                   <TiSocialGithubCircular size={SIZE_LOGO+8} color={COLOUR_LOGO}/>
                   <FaTwitter size={SIZE_LOGO} color={COLOUR_LOGO}/>
                   <LFaceBook size={SIZE_LOGO} color={COLOUR_LOGO}/>
                   <LLinkedin size={SIZE_LOGO} color={COLOUR_LOGO}/>
                   </a>
              </div>
            </section>
          </Col>
        </Row>
    </footer>
    );
  }
}
