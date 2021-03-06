import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import NotFoundPage from "../../pages/404"
import Loading from "../Loading/";
import Meta from "./Meta";
import Author from "./Author";
import NextPrev from "./NextPrev";

const getCurrentItem = (path, items) =>{
  for(const item of items){
    if(item.slug==path) return item
  }
  return null; // 404, page not found
}

const Post = props => {
  const {
    items,
    theme
  } = props;
  if(!items){
    return(
      <Loading theme={theme}/>
    )
  }
  useEffect(() => { // Scroll to top of article page on render
    console.log("POST RENDERED...")
    window.scrollTo(0, 0)
    
  }, [])
  let item = getCurrentItem(props.location.pathname, items);
  if(!item) return (<NotFoundPage theme={theme}/>);
  // console.log("POST SAYS:")
  // console.log(item)
  return (
    <React.Fragment>
    <div className="post-wrapper">
      <header>
          <Headline title={item.headline} theme={theme} />
          <Meta prefix={item.creation_date} lastEdit={item.creation_date} author="AUTHOR NAME HERE PLEASE" tags={item.tags} theme={theme} />
        </header>
        <Bodytext content={item} theme={theme} />
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
