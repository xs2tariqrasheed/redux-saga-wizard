/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';
import HomePage from 'containers/HomePage/Loadable';
import H1 from 'components/H1';

const AppWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  color: rgba(49,32,24,0.64);
`;

function App() {
  return (
    <AppWrapper>
      <Helmet defaultTitle="redux-saga-wizard">
        <meta name="description" content="Redux Saga Wizard" />
      </Helmet>
      <H1>Welcome to redux-saga-wizard</H1>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </AppWrapper>
  );
}

export default hot(App);
