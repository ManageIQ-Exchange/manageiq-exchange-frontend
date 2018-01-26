import React from 'react';
import { storiesOf } from '@storybook/react';
import { defaultTemplate } from '../../../storybook/decorators/storyTemplates';
import { DOCUMENTATION_URL } from '../../../storybook/constants';
import {
  HorizontalNav,
  HorizontalNavHeader,
  NavBrand,
  HorizontalCollapse
} from './index';
import { action } from '@storybook/addon-actions';
import { MenuItem } from '../../index';
import { ListGroup, ListGroupItem } from '../ListGroup/index';
import DropdownButton from '../Button/DropdownButton';
import Icon from '../Icon/Icon';

const stories = storiesOf('Navigation', module);

const description = (
  <p>
    This component is based on Patternfly horizontal navigation component. See{' '}
    <a
      href={
        DOCUMENTATION_URL.PATTERNFLY_ORG_NAVIGATION + 'horizontal-navigation/'
      }
    >
      Patternfly Docs
    </a>
    for complete Horizontal Navigation component documentation.
  </p>
);

stories.addDecorator(
  defaultTemplate({
    title: 'Horizontal Navigation',
    documentationLink:
      DOCUMENTATION_URL.PATTERNFLY_ORG_NAVIGATION + 'horizontal-navigation/',
    description: description
  })
);
const title1 = <Icon type="pf" name="help" title="Help" />;
const title2 = (
  <span>
    <Icon type="pf" name="user" style={{ marginRight: 10 + 'px' }} />
    Brian Johnson
  </span>
);

stories.addWithInfo('Horizontal Navigation', '', () => (
  <HorizontalNav>
    <HorizontalNavHeader>
      <NavBrand
        href="/"
        iconImg="http://www.patternfly.org/assets/img/brand.svg"
      />
    </HorizontalNavHeader>
    <HorizontalCollapse>
      <ListGroup bsClass="nav navbar-nav navbar-utility">
        <ListGroupItem bsClass="">
          <DropdownButton
            title={title1}
            id="help_button"
            onClick={action('onClick')}
          >
            <MenuItem bsClass="" eventKey="1">
              Help
            </MenuItem>
            <MenuItem bsClass="" eventKey="2">
              About
            </MenuItem>
          </DropdownButton>
        </ListGroupItem>
        <ListGroupItem bsClass="">
          <DropdownButton
            title={title2}
            id="user_button"
            onClick={action('onClick')}
          >
            <MenuItem bsClass="" eventKey="1">
              Link
            </MenuItem>
            <MenuItem bsClass="" eventKey="2">
              Another link
            </MenuItem>
            <MenuItem bsClass="" eventKey="2">
              Something else here
            </MenuItem>
          </DropdownButton>
        </ListGroupItem>
      </ListGroup>
      <ListGroup bsClass="nav navbar-nav navbar-primary">
        <ListGroupItem bsClass="">
          <a href="#0">First Link</a>
        </ListGroupItem>
        <ListGroupItem bsClass="" active>
          <a href="#0">Another Link</a>
        </ListGroupItem>
        <ListGroupItem bsClass="">
          <a href="#0">And Another</a>
        </ListGroupItem>
      </ListGroup>
    </HorizontalCollapse>
  </HorizontalNav>
));
