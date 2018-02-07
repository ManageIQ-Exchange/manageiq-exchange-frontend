import React from "react";
import { Icon } from "patternfly-react";
import "./style.css";

const ListView = ({  }) => (
  <div>
    <div className="list-view-pf-main-info">
        <div className="list-view-pf-left">
          <span className="fa fa-plane list-view-pf-icon-sm"></span>
        </div>
        <div className="list-view-pf-body">
          <div className="list-view-pf-description">
            <div className="list-group-item-heading">
              Event One
            </div>
            <div className="list-group-item-text">
              The following snippet of text is <a href="#">rendered as link text</a>.
            </div>
          </div>
          <div className="list-view-pf-additional-info">
            <div className="list-view-pf-additional-info-item">
              <span className="pficon pficon-screen"></span>
              <strong>8</strong> Hosts
            </div>
            <div className="list-view-pf-additional-info-item">
              <span className="pficon pficon-cluster"></span>
              <strong>6</strong> Clusters
            </div>
          </div>
        </div>
    </div>
  </div>
);

export default ListView;
