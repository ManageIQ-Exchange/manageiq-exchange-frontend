import React from "react";
import { Icon } from "patternfly-react";
import "./style.css";

const CardItem = ({ cardInformation }) => {
  return (
    <div className="container-fluid container-cards-pf">
      <div className="row row-cards-pf">
        <div className="card-pf card-pf-accented">
          <div className="card-pf-heading">
            <h2 className="card-pf-title">  {cardInformation ? cardInformation.full_name : ""}</h2>
          </div>
          <div className="card-pf-body">
            <div className="progress-description">
              Type:{" "}
              <span style={{ float: "right" }}>
                {cardInformation ? cardInformation.type : "---"}
              </span>
            </div>
            <div className="progress-description">
              Author<span style={{ float: "right" }}>
                {cardInformation ? cardInformation.user_login : "---"}
              </span>
            </div>
            <div className="progress-description">
              Tags<span style={{ float: "right" }}>
                {cardInformation && cardInformation.metadata
                  ? cardInformation.metadata.tags.map((tag, index) => (
                      <span key={`tag_card_${index}`}>{tag}, </span>
                    ))
                  : "---"}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <div>
              <Icon className="icon-footer" name="eye" />
              Watch {cardInformation ? cardInformation.watchers_count : ""}
            </div>
            <div>
              <Icon className="icon-footer" name="star" />
              Star {cardInformation ? cardInformation.stargazers_count : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
