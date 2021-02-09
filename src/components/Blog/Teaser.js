import { FaArrowRight } from "react-icons/fa/";
import { FaCalendar } from "react-icons/fa/";

import { Link } from "gatsby"
import PropTypes from "prop-types";
import React, { useState } from "react";
import Loading from "../Loading"

import api from "../../API"
const Teaser = props => {
  const [isLoading, setIsLoading] = useState(false);
  const stopLoading = (response) =>{
    // The 'response' is not used. Here could be some error handling in case for example
    // the backend was not successfull
    window.location.reload();
    
  }
  const {
    theme,
    post,
  } = props;
  // console.log("TEASER:")
  // console.log(post)
  const onDelete = (event) =>{
    event.preventDefault();
    setIsLoading(true);
    api.deleteArticle(post.id, stopLoading);
  }
  if(isLoading){
    return (<Loading theme={theme}/>)
  }
  return (
    <React.Fragment>
      <li>
        <Link 
          to={post.slug} 
          key={post.slug} 
          className="link"
          state={{ prevPath: location.pathname }}
        >
          <div className="gatsby-image-outer-wrapper">
            <img 
              src={post.image_url}
              alt=""
              className="gatsby-image-wrapper"
            />
          </div>
          <h1>
            {post.headline} <FaArrowRight className="arrow" />
            {props.admin && <button className="delete-article-btn" onClick={onDelete}>Delete Article</button>}
            
          </h1>
          <p className="meta">
            <span>
              <FaCalendar size={18} /> {post.creation_date}
              
            </span>

          </p>
          
          <p>
            {post.excerpt}
          </p>
          
        </Link>
        
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        .gatsby-image-wrapper{
          width:100%;
          min-height:400px;
          max-height:600px;
        }
        :global(.link) {
          width: 100%;
          color: ${theme.text.color.primary};
        }

        li {
          border: 1px solid transparent;
          border-radius: ${theme.size.radius.default};
          margin: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 3)`};
          padding: ${theme.space.inset.s};
          position: relative;
          transition: all ${theme.time.duration.default};
          background: transparent;

          :global(.gatsby-image-outer-wrapper) {
            border-radius: ${theme.size.radius.default};
            border: 1px solid ${theme.line.color};
            height: 400px;
            overflow: hidden;
            width:100%;
          }
          :global(.gatsby-image-outer-wrapper img) {
            z-index: -1;
          }

          &::after {
            border-top: 1px solid ${theme.line.color};
            content: "";
            height: 0;
            position: absolute;
            bottom: ${`calc(${theme.space.default} * -1.5)`};
            left: 50%;
            transform: translateX(-50%);
            transition: all ${theme.time.duration.default};
            width: 50%;
          }

          &:last-child {
            margin-bottom: 10px;
          }
        }

        h1 {
          padding: ${theme.space.m} ${theme.space.s} 0;
          line-height: ${theme.blog.h1.lineHeight};
          font-size: ${theme.blog.h1.size};
          text-remove-gap: both;

          :global(.arrow) {
            display: none;
            position: relative;
            top: 7px;
          }
        }
        .delete-article-btn{
          background-color: red;
          border: 2px solid red;
          color: white;
          padding: 6px 12px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border-radius: ${theme.size.radius.small};
          font-size: 14px;
          margin: 12px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          float:right;
        }
        .delete-article-btn:hover{
          background-color: white;
          color: black;
        }
        .meta {
          display: flex;
          flex-flow: row wrap;

          font-size: 0.8em;
          padding: ${theme.space.m} ${theme.space.s};
          background: transparent;

          :global(svg) {
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
          }
        }

        p {
          line-height: 1.5;
          padding: 0 ${theme.space.s};
          text-remove-gap: both;
        }

        @from-width tablet {
          li {
            margin: ${`calc(${theme.space.default} * 3) 0 calc(${theme.space.default} * 4)`};
            padding: ${theme.space.default};

            &::after {
              bottom: ${`calc(${theme.space.default} * -2)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -1.75)`};
              }
            }
          }

          h1 {
            font-size: ${`calc(${theme.blog.h1.size} * 1.2)`};
            padding: ${`calc(${theme.space.default} * 1.5) ${theme.space.default} 0`};
            transition: all 0.5s;
          }
          .meta {
            padding: ${`calc(${theme.space.m} * 1.5) ${theme.space.m}`};
          }
          p {
            padding: 0 ${theme.space.default};
          }
        }
        @below desktop {
          li {
            border: 1px solid ${theme.line.color};
            box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);
            margin-top: 20px;
            margin-bottom: 20px;
            
            &:first-child {
              margin-top: 0;
            }

            &::after {
              border-top: 0px;
            }
          }
        }
        @from-width desktop {
          li {
            margin: ${`calc(${theme.space.default} * 4) 0 calc(${theme.space.default} * 5)`};
            padding: 0 0 ${`calc(${theme.space.default} * 2)`};

            &::after {
              bottom: ${`calc(${theme.space.default} * -1.5)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -2.75)`};
              }
            }
          }

          :global(.blogItemLink:first-child) > li::before {
            top: ${`calc(${theme.space.default} * -2.75)`};
          }
          h1 {
            font-size: 2.5em;
            padding: ${`calc(${theme.space.default} * 1.2) calc(${theme.space.default} * 2) 0`};
          }
          .meta {
            padding: ${`calc(${theme.space.default} * 1.5) calc(${theme.space.default} * 2)
              calc(${theme.space.default} * 0.5)`};
          }
          p {
            padding: ${`0 calc(${theme.space.default} * 2)`};
          }
          li {
            &:hover {
              border: 1px solid ${theme.line.color};
              box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

              &:after {
                bottom: ${`calc(${theme.space.default} * -2.5)`};
              }
              :global(.gatsby-image-wrapper) {
                transform: scale(1.1);
              }
              h1 {
                color: ${theme.blog.h1.hoverColor};
              }
              :global(.arrow) {
                opacity: 1;
                stroke: ${theme.color.special.attention};
                transform: translateX(0);
              }
            }
            :global(.gatsby-image-wrapper) {
              transition: all ${theme.time.duration.default};
            }
            :global(.arrow) {
              display: inline-block;
              fill: ${theme.color.special.attention};
              stroke: ${theme.color.special.attention};
              stroke-width: 40;
              stroke-linecap: round;
              opacity: 0;
              transition: all 0.5s;
              transform: translateX(-50%);
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Teaser.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Teaser;
