import PropTypes from "prop-types";
import React from "react";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import { graphql } from 'gatsby'

const NotFoundPage = props => {

  return (
    <Article theme={props.theme}>
      <header>
        <Headline title="404" theme={props.theme} />
      </header>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Article>
  );
};

export default NotFoundPage;
