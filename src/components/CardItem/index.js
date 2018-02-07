import React from "react";
import { Icon } from "patternfly-react";
import "./style.css";

const CardItem = ({ cardInformation }) => (
  <div
    className="container-fluid container-cards-pf"
  >
    <div className="row row-cards-pf">
      <div className="card-pf card-pf-accented">
        <div className="card-pf-heading">
          <h2 className="card-pf-title">Mysql</h2>
        </div>
        <div className="card-pf-body">
          <div className="progress-description">
            Type: <span style={{ float: "right" }}>{cardInformation ? cardInformation.type : '---'}</span>
          </div>
          <div className="progress-description">
            Author<span style={{ float: "right" }}>{cardInformation ? cardInformation.author : '---'}</span>
          </div>
          <div className="progress-description">
            OS<span style={{ float: "right" }}>{cardInformation ? cardInformation.os : '---'}</span>
          </div>
          <div className="progress-description">
            Clouds<span style={{ float: "right" }}>{cardInformation ? cardInformation.clouds : '---'}</span>
          </div>
          <div className="progress-description">
            Tags<span style={{ float: "right" }}>
              {cardInformation
                ? cardInformation.tags.map((tag, index) => (
                    <span key={`tag_card_${index}`}>{tag}, </span>
                  ))
                : '---'}
            </span>
          </div>
          <div className="progress-description">
            Last Commit<span style={{ float: "right" }}>{cardInformation ? cardInformation.last_commit : '---'}</span>
          </div>
        </div>
        <div className="card-footer">
          <div>
            <Icon className="icon-footer" name="eye" />
            Watch 25
          </div>
          <div>
            <Icon className="icon-footer" name="star" />
            Star 145
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardItem;
