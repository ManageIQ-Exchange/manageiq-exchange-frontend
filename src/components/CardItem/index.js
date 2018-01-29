import React from "react";
import { Icon } from "patternfly-react";
import "./style.css";

const CardItem = () => (
  <div className="container-fluid container-cards-pf">
    <div className="row row-cards-pf">
      <div className="col-xs-6 col-sm-4 col-md-4">
        <div className="card-pf">
          <div className="card-pf-heading">
            <h2 className="card-pf-title">Mysql</h2>
          </div>
          <div className="card-pf-body">
            <div className="progress-description">Type: <span style={{float:'right'}} >Ansible</span></div>
            <div className="progress-description">Author<span style={{float:'right'}} >bennojoy</span></div>
            <div className="progress-description">OS<span style={{float:'right'}} >Enterprise_Linux</span>></div>
            <div className="progress-description">Clouds<span style={{float:'right'}} >NA</span></div>
            <div className="progress-description">Tags<span style={{float:'right'}} >database, sql</span></div>
            <div className="progress-description">Last Commit<span style={{float:'right'}} >NA</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardItem;
