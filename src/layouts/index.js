import PropTypes from "prop-types";
import React from "react";
import { FaCog } from "react-icons/fa/";
import ScrollMemory from 'react-router-scroll-memory';
import NotFoundPage from '../pages/404';

import { getScreenWidth, timeoutThrottlerHandler } from "../utils/helpers";
import Footer from "../components/Footer/";
import Header from "../components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home"
import ScrollToTop from "./ScrollToTop"

export const ThemeContext = React.createContext(null);
export const ScreenWidthContext = React.createContext(0);

import themeObjectFromYaml from "../theme/theme.yaml";

import View from "../components/Blog/View";
// import Page from "../components/Page";
// import PageTemplate from "../templates/PageTemplate";
import Post from "../components/Post";

import 'typeface-open-sans/index.css'
import api from "./../API";
function getDate(timestamp){
    const date = new Date(timestamp * 1000);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${ye}-${mo}-${da}`
}

class Layout extends React.Component {

  constructor() {
    super();
    const updateState = (response) =>{
        
        let items = [];
        let numOfArticles = Object.keys(response).length
        for(let i = 0;i<numOfArticles;i++){
            const date = getDate(response[i].created);
            items.push({
                text:response[i].text,
                excerpt:response[i].excerpt,
                slug:response[i].slug,
                creation_date:date,
                tags:[],
                id:response[i].article_id,
                headline:response[i].headline,
                image_url:response[i].image_url
            })

        }
        // console.log(items)
        this.setState({
            ...this.state,
            items: items,
            isLoading:false,
        })
        // window.scrollTo(0,1000);
        // window.scrollTo(0,localStorage.getItem("homeYScroll"))
    }
    //   console.log("INSPECTING")
    //   console.log(props.pageContext.initialPosts[2].node.excerpt)
    //   props.pageContext.initialPosts[2].node.excerpt = "FUCK FACE"
    // console.log("UPDATING STATE...")
    this.state = {
      screenWidth: 0,
      headerMinimized: false,
      theme: themeObjectFromYaml,
      'isLoading':true
    };
    api.getAllArticles(updateState)
  }


  // pokeState = () =>{
  //   console.log("POKED")
  // }
  componentDidMount() {
    console.log("Index mounted...")
    localStorage.setItem("homeYScroll", 0)
    this.setState({
      screenWidth: getScreenWidth()
    });


  }
  componentDidUpdate(prevProps, prevState){
    console.log("INDEX UPDATED...")
    window.requestAnimationFrame(function() {
      document.body.style.overflow = "auto";
    });

  }

  render() {
    const getArticleRoutes = ()=>{
      let articleRoutes = [];
      this.state.items.map(item =>{
        let pageeeee = {headline:item.headline, text:item.text, image:item.image_url, date:item.creation_date, id:item.id, tags:item.tags};
        articleRoutes.push(
          <Route path={item.slug} exact key={item.slug}>
            <ArticlePage page={pageeeee} theme={this.state.theme}/>
          </Route>
        )
      })

      return articleRoutes;
    }


    let homeContent;
    let articleContent;
    let articleRoutes;
    if(this.state.isLoading){
      homeContent =
        <React.Fragment>
          <div className="spinner">
              <FaCog/>
          </div>
          <style jsx>{`
              @keyframes spinner {
              to {transform: rotate(360deg);}
              }
              .spinner {
              margin-top: 50vh;
              font-size: 60px;
              text-align: center;

              :global(svg) {
                  fill: ${this.state.theme.color.brand.primaryLight};
                  animation: spinner 3s linear infinite;
              }
              
              }
                  
          `}</style>
        </React.Fragment>;
        articleContent = homeContent;
    }
    else{
      
      homeContent = <HomePage theme={this.state.theme} items={this.state.items} />
      articleRoutes = getArticleRoutes();
    }
    
    return (
      <ThemeContext.Provider value={this.state.theme}>
          <Router>
            <React.Fragment>
              <div className="highest-container">
                <Header
                  path={this.props.location.pathname}
                  theme={this.state.theme}
                />
                <main>
                  <Switch>
                    {articleRoutes}
                    <Route path="/" exact>
                      {homeContent}
                    </Route>
                    <Route >
                      <NotFoundPage theme={this.state.theme}/>
                    </Route>
                  </Switch>
                </main>
                <Footer theme={this.state.theme}/>
              </div>
              <style jsx>{`
                .highest-container {
                  min-height: 100%;
                  position: relative;
                }
                main {
                  padding-bottom: 80px;
                }
              `}</style>
              <style jsx global>{`
                html {
                  box-sizing: border-box;
                  height: 100%;
                }
                body {
                  height: 100%;
                  overflow:hidden;
                }

                #___gatsby {
                  height: 100%;
                }
                #___gatsby > div {
                  height: 100%;
                }
                *,
                *:after,
                *:before {
                  box-sizing: inherit;
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: 'Open Sans', 'Arial', 'sans-serif';
                  font-weight: 400;
                }
                h1,
                h2,
                h3 {
                  font-weight: 600;
                  font-family: 'Open Sans', 'Arial', 'sans-serif';
                  line-height: 1.1;
                  letter-spacing: -0.03em;
                  margin: 0;
                }
                h1 {
                  letter-spacing: -0.04em;
                }
                p {
                  margin: 0;
                }
                strong {
                  font-family: 'Open Sans', 'Arial', 'sans-serif';
                  font-weight: 600;
                }
                a {
                  text-decoration: none;
                  color: #666;
                }
                main {
                  width: auto;
                  display: block;
                }
                table, th, td {
                  border: 1px solid #DDD;
                }
                th, td {
                  padding: 5px;
                }
              `}</style>
              {/* </ScrollToTop> */}
            </React.Fragment>
          </Router>
          
      </ThemeContext.Provider>
    )
    
  }
}


let HomePage = (props) => (
    <View theme={props.theme} items={props.items}></View>
)
let ArticlePage = (props) => (
  <Post page={props.page} theme={props.theme}></Post>
)
Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;