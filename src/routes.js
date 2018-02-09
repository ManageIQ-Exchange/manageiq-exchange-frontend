import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './containers/IndexPage/index';
import ExplorePage from './containers/ExplorePage/';
import AboutPage from './containers/AboutPage/index';
import AuthorsPage from './containers/AuthorPage/index';
import SpinProfile from './containers/SpinProfile/';
import SpinView from './containers/SpinView/index';
import SearchPage from './containers/SearchPage/index';
import SignInPage from './containers/SignInPage/';
import MyContentPage from './containers/MyContentPage/';
import AuthorProfile from './containers/AuthorProfile/';
import NotFoundPage from './containers/NotFoundPage/index';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/explore/" component={ExplorePage}/>
    <Route path="/signin/" component={SignInPage}/>
    <Route path="/about/" component={AboutPage}/>
    <Route path="/authors/" component={AuthorsPage}/>
    <Route path="/authors/:idAuthor" component={AuthorProfile}/>
    <Route path="/spin/:idSpin" component={SpinProfile}/>
    <Route path="/:userName/:spinName" component={SpinView}/>
    <Route path="/search/" component={SearchPage}/>
    <Route path="/mycontent/" component={MyContentPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
