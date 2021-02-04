import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import NextPrev from "./NextPrev";

const Post = props => {
  const {
    page,
    theme
  } = props;

  useEffect(() => { // Scroll to top of article page on render
    console.log("POST RENDERED...")
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
    <div className="post-wrapper">
      <header>
          <Headline title={page.headline} theme={theme} />
          <Meta prefix={page.date} lastEdit={page.date} author="AUTHOR NAME HERE PLEASE" tags={page.tags} theme={theme} />
        </header>
        <Bodytext content={page} theme={theme} />
        {/* <footer>
          <NextPrev next={nextPost} prev={prevPost} theme={theme} />
        </footer> */}
    </div>

      <style jsx>{`
        .post-wrapper {
          margin:100px auto;
          width:700px;
        }
      `}</style>
    </React.Fragment>
  );
};



export default Post;
