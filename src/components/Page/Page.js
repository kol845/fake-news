import React, { useEffect } from "react";
import PropTypes from "prop-types";


import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";

const Page = props => {
  useEffect(() => {
    console.log("PAGE LOADED...")
    console.log(props)
  })

  return (
    <React.Fragment>
      <header>
        <Headline title={props.page.headline} theme={props.theme} />
      </header>
      <Bodytext content={props.page} theme={props.theme} />
    </React.Fragment>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Page;
