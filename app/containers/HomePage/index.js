/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer } from 'redux-injectors';
import H1 from 'components/H1';

import { reducer } from './slice';

export default function HomePage() {
  useInjectReducer({ key: 'home', reducer });
  useEffect(() => {}, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <H1>Welcome to redux-saga-wizard lo fer</H1>
    </article>
  );
}
