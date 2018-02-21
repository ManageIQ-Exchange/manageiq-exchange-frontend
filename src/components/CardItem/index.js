import React from 'react';
import { Icon } from 'patternfly-react';
import './style.css';

const CardItem = ({ cardInformation }) => {
  const fullName =
    cardInformation && cardInformation.full_name
      ? cardInformation.full_name
      : '';
  const numWatchers =
    cardInformation
      ? cardInformation.watchers_count
      : '';
  const numStargazers =
    cardInformation
      ? cardInformation.stargazers_count
      : '';
  return (
    <div className="card-pf card-pf-view card-pf-view-select card-pf-view-single-select">
      <div className="card-pf-body">
        <div className="card-pf-top-element" />
        <h2 className="card-pf-title text-center" style={{ fontSize: '14px' }}>
          {fullName}
        </h2>
        <div className="card-pf-items text-center">
          <div className="card-pf-item">
            <Icon name="star" />
            <span className="card-pf-item-text">{numStargazers}</span>
          </div>
          <div className="card-pf-item">
            <Icon name="eye" />
            <span className="card-pf-item-text">{numWatchers}</span>
          </div>
        </div>
        <p className="card-pf-info text-center">
          <strong>Tags</strong> <br />
          <div>
            {cardInformation && cardInformation.metadata
              ? cardInformation.metadata.tags.map((tag, index) => (
                  <span className="label label-info" key={`tag_card_${index}`} style={{fontSize:'0.75em', marginRight:'1%'}}>
                    {tag}
                  </span>
                ))
              : '---'}
          </div>
        </p>
      </div>
      <div className="card-pf-view-checkbox">
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default CardItem;
