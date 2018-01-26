import React from 'react';
import Menu from './Nav/Menu';
import Footer from './Footer/index';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router';
import { LogError } from '../service/Log'

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  UserProfile(){
    this.setState({showProfile: true})
  }

  render() {
    return (
      <div className="app-container">
        <header>
          <Menu />
        </header>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
