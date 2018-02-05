import React from "react";
import { Row, Col } from "patternfly-react";
import "./style.css";
import SocialButtonLogin from "../SocialButtonLogin/";

const Login = ({ onSignIn, provider }) => {
  let keys = Object.keys(provider);
  return (
    <div style={{ marginBottom: "3%" }}>
      <Row style={{ marginBottom: "3%" }}>
        <Col md={12}>
          {keys.map((key, index) => {
            return (
              <Row key={`element_provider_${index}`} >
                <Col md={2} />
                <Col md={8}>
                  <SocialButtonLogin
                    provider={key}
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

export default Login;
