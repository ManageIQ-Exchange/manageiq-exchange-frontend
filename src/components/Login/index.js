import React from 'react';
import { Row, Col } from 'patternfly-react';
import PropTypes from 'prop-types';

import './style.css';
import SocialButtonLogin from '../SocialButtonLogin/';

const propTypes = {
  onSignIn: PropTypes.func,
  provider: PropTypes.object
};

const Login = ({ onSignIn, provider }) => {
  let keys = [];
  if (provider) keys = Object.keys(provider);
  return (
    <div style={{ marginBottom: '3%' }}>
      <Row style={{ marginBottom: '3%' }}>
        <Col md={12}>
          {keys.map((key, index) => {
            const idApplication = provider[key]
              ? provider[key].id_application
              : '';
            return (
              <Row key={`element_provider_${index}`}>
                <Col md={2} />
                <Col md={8}>
                  <SocialButtonLogin
                    provider={key}
                    idApplication={idApplication}
                    type={provider[key].type}
                    sizeIcon={2}
                    message={provider[key].type}
                    onClick={onSignIn}
                  />
                </Col>
                <Col md={2} />
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

Login.propTypes = propTypes;

export default Login;
