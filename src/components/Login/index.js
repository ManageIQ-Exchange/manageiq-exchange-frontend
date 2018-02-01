import React from 'react';
import { Row, Col } from 'patternfly-react';
import './style.css';
import SocialButtonLogin from '../SocialButtonLogin/';

const Login = ({ onSignIn }) => {
  return (
    <div style={{ marginBottom: '3%' }}>
      <Row
        style={{ marginBottom: '3%' }}
      >
        <Col md={12}>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <SocialButtonLogin type="github" sizeIcon={2} message="Github" onClick={onSignIn} />
            </Col>
            <Col md={2} />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col md={2} />
            <Col md={8}>
              <SocialButtonLogin type="gitlab" sizeIcon={2} message="Gitlab" />
            </Col>
            <Col md={2} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
