import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Loading from "../Loading"

import api from "../../API"
// Random image: https://picsum.photos/seed/picsum/1200/700
function autosize(){
  var el = this;
  setTimeout(function(){
    // el.style.cssText = 'height:auto;';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}


/** Template for "home" page with infinite scroll and fallback to pagination. */
const ArticleCreator = props => {
  const [isLoading, setIsLoading] = useState(false);

  const stopLoading = (response) =>{
    // The 'response' is not used. Here could be some error handling in case for example
    // the backend was not successfull
    window.location.reload();
    
  }
  const {
      theme,
  } = props;
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    var textarea = document.querySelector('textarea');
    textarea.addEventListener('keydown', autosize);
  },[])
  const onSubmit = (event)=>{
    setIsLoading(true);
    api.createArticle(event, stopLoading)
  }
  if(isLoading){
    return (<Loading theme={theme}/>)
  }
  return(

      <React.Fragment>
      {/* <li> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="creation-wrapper-outer">
            <div id="creation-wrapper-inner">
              <input type="text" name="headline" id="headline-input" placeholder="Article Headline..." ref={register({ required: true})}/>
              {errors.headline && errors.headline.type === "required" && (
                <p className="errorMsg">Headline is required.</p>
              )}
              <input type="text" name="image" id="image-input" placeholder="Image URL..." ref={register({ required: true})}/>
              {errors.image && errors.image.type === "required" && (
                <p className="errorMsg">Image URL is required.</p>
              )}
              <textarea type="text" name="text" id="text-input" placeholder="Article text..." ref={register({ required: true})} />
              {errors.text && errors.text.type === "required" && (
                <p className="errorMsg">Article text is required.</p>
              )}
            </div>
            <button id="create-article-btn" type="submit">Create Article</button>
          </div>
          
        </form>
      {/* </li> */}

      {/* --- STYLES --- */}
      <style jsx>{`


        #creation-wrapper-outer {
          margin: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 3)`};
          padding: ${theme.space.inset.s};
          background: transparent;
        }

        h1 {
          padding: ${theme.space.m} ${theme.space.s} 0;
          line-height: ${theme.blog.h1.lineHeight};
          font-size: ${theme.blog.h1.size};
          text-remove-gap: both;


        }
        #creation-wrapper-inner{
          border-color:${theme.text.color.primary};
          border-style: solid;
          border-radius: ${theme.size.radius.default};
          border-width:1px;
          width: 100%;
          padding:12px;
          color: ${theme.text.color.primary};          
        }
        input:focus{
          outline-color:${theme.color.brand.primary};
        }
        textarea:focus{
          outline-color:${theme.color.brand.primary};
        }
        button:focus{
          outline-color:${theme.color.brand.primary};
        }
        button:active {
          background-color: #3e8e41;
          transform: translateY(4px);
        }
        #headline-input{
          color: ${theme.text.color.primary};
          width: 100%;
          padding: ${theme.space.m} ${theme.space.s} 0;
          line-height: ${theme.blog.h1.lineHeight};
          font-size: ${theme.blog.h1.size};
          text-remove-gap: both;
          border:none;
          display:block;
        }
        #image-input{
          color: ${theme.text.color.primary};
          width: 100%;
          padding: ${theme.space.s} ${theme.space.s} 0;
          text-remove-gap: both;
          border:none;
          display:block;
          margin:25px 0;
        }
        #text-input{
          color: ${theme.text.color.primary};
          width: 100%;
          line-height: 1.5;
          padding: ${theme.space.s} ${theme.space.s} 0;
          text-remove-gap: both;
          display:block;
          border:none;
          overflow:hidden;
          resize: none;
          margin:25px 0;
          height:200px;
          white-space: pre-wrap;
        }
        #create-article-btn{
          background-color: ${theme.color.brand.primary};
          border: 2px solid ${theme.color.brand.primary};
          color: white;
          padding: 12px 24px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border-radius: ${theme.size.radius.small};
          font-size: 16px;
          margin: 12px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          float:right;
        }
        #create-article-btn:hover{
          background-color: white;
          color: black;
        }
        .errorMsg{
          padding:${theme.space.s} ${theme.space.s} 0;
          color: red;
          display:block;
          margin:12px 0;
        }
        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          padding: ${theme.space.m} ${theme.space.s};
          background: transparent;
        }

        p {
          line-height: 1.5;
          padding: 0 ${theme.space.s};
          text-remove-gap: both;
        }

        @from-width tablet {
          #creation-wrapper-outer {
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

        }
        @from-width desktop {
          #creation-wrapper-outer {
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

        }
      `}</style>
    </React.Fragment>
      
  )
}

export default ArticleCreator;